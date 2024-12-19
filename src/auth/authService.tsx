import { Log, User, UserManager, UserManagerSettings, WebStorageStateStore, } from 'oidc-client-ts'
import * as Sentry from '@sentry/browser'
import HttpStatusCode from 'http-status-typed'

import pickProfileApiToken from './pickTalpaApiToken'
import createHttpPoller, { HttpPoller } from './http-poller'

export const API_TOKEN = 'apiToken'

export type ApiTokenClientProps = {
  url: string;
  queryProps?: { permission: string; grant_type: string };
  audiences?: string[];
};

export class AuthService {
  userManager: UserManager
  userSessionValidityPoller: HttpPoller
  private _isProcessingLogin = false
  private apiTokensClientConfig: ApiTokenClientProps
  private authServerType: 'KEYCLOAK' | 'TUNNISTAMO'

  constructor() {

    let settings: Partial<UserManagerSettings> = {}
    this.authServerType = process.env.REACT_APP_AUTH_SERVER_TYPE as 'KEYCLOAK' | 'TUNNISTAMO' || 'TUNNISTAMO'
    switch (this.authServerType) {
      case 'TUNNISTAMO':
        settings = {
          automaticSilentRenew: true,
          userStore: new WebStorageStateStore({ store: window.sessionStorage }),
          authority: process.env.REACT_APP_OIDC_AUTHORITY,
          client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
          redirect_uri: process.env.REACT_APP_OIDC_CALLBACK_PATH,
          silent_redirect_uri: `${origin}/silent_renew.html`,
          response_type: process.env.REACT_APP_OIDC_RESPONSE_TYPE,
          scope: process.env.REACT_APP_OIDC_SCOPE,
          post_logout_redirect_uri: `${origin}/`,
          // This calculates to 1 minute, good for debugging:
          // eslint-disable-next-line max-len
          // https://github.com/City-of-Helsinki/kukkuu-ui/blob/8029ed64c3d0496fa87fa57837c73520e8cbe37f/src/domain/auth/userManager.ts#L18
          // accessTokenExpiringNotificationTime: 59.65 * 60,
        }
        break
      case 'KEYCLOAK':
        settings = {
          automaticSilentRenew: true,
          userStore: new WebStorageStateStore({ store: window.sessionStorage }),
          authority: process.env.REACT_APP_KEYCLOAK_OIDC_AUTHORITY,
          client_id: process.env.REACT_APP_KEYCLOAK_OIDC_CLIENT_ID,
          redirect_uri: process.env.REACT_APP_KEYCLOAK_OIDC_CALLBACK_PATH,
          silent_redirect_uri: `${origin}/silent_renew.html`,
          response_type: process.env.REACT_APP_KEYCLOAK_OIDC_RESPONSE_TYPE,
          scope: process.env.REACT_APP_KEYCLOAK_OIDC_SCOPE,
          post_logout_redirect_uri: `${origin}/`,
          loadUserInfo: true,
          // This calculates to 1 minute, good for debugging:
          // eslint-disable-next-line max-len
          // https://github.com/City-of-Helsinki/kukkuu-ui/blob/8029ed64c3d0496fa87fa57837c73520e8cbe37f/src/domain/auth/userManager.ts#L18
          // accessTokenExpiringNotificationTime: 59.65 * 60,
        }

        break
    }

    // Show oidc debugging info in the console only while developing
    if (process.env.NODE_ENV === 'development') {
      Log.setLogger(console)
      Log.setLevel(Log.INFO)
    }

    // User Manager instance
    this.userManager = new UserManager(settings as UserManagerSettings)

    // Api tokens client configuration
    this.apiTokensClientConfig = {
      url: this.getApiClientUrl(),
      queryProps:
        this.getApiClientQueryProps(),
    }

    // Public methods
    this.getUser = this.getUser.bind(this)
    this.getToken = this.getToken.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.login = this.login.bind(this)
    this.endLogin = this.endLogin.bind(this)
    this.renewToken = this.renewToken.bind(this)
    this.logout = this.logout.bind(this)
    this.getAuthServerType = this.getAuthServerType.bind(this)
    this.fetchApiToken = this.fetchApiToken.bind(this)
    const userInfoFetchFunction = async (): Promise<Response | undefined> => {
      console.log('userInfoFetchFunction started')
      const uri = await this.userManager.metadataService.getUserInfoEndpoint()
      const user = await this.getUser()
      console.log('userInfoFetchFunction user:')
      const accessToken = user && user.access_token
      if (!accessToken) {
        return Promise.reject(new Error('Access token not set'))
      }

      if (this.authServerType === 'TUNNISTAMO') {
        const headers = new Headers()
        headers.append('Authorization', `Bearer ${accessToken}`)

        return fetch(uri, {
          method: 'GET',
          headers,
        })
      }

      // Refresh token
      const renewedUser = await this.renewToken()
      if (renewedUser) {
        const accessToken = renewedUser.access_token
        if (!accessToken) {
          return Promise.reject(new Error('Access token not set'))
        }
        try {
          // Store or handle the returned API token
          sessionStorage.setItem(API_TOKEN, renewedUser.access_token)

        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch API token', error)
          if (!(error instanceof Error)) {
            // eslint-disable-next-line no-ex-assign
            error = new Error(`Login-rejection: ${JSON.stringify(error)}`);
          }
          Sentry.captureException(error)
        }
      }
    }

    this.userSessionValidityPoller = createHttpPoller({
      pollFunction: userInfoFetchFunction,
      shouldPoll: () => this.isAuthenticated(),
      onError: returnedHttpStatus => {
        console.log(`userSessionValidityPoller status ${returnedHttpStatus}`)
        if (
          this.isAuthenticated() &&
          returnedHttpStatus &&
          (returnedHttpStatus === HttpStatusCode.FORBIDDEN ||
            returnedHttpStatus === HttpStatusCode.UNAUTHORIZED)
        ) {
          this.logout()
          return { keepPolling: false }
        }
        return { keepPolling: this.isAuthenticated() }
      },
    })

    // Events
    this.userManager.events.addAccessTokenExpired(() => {
      console.log(`addAccessTokenExpired called`)
      this.logout()
      this.userSessionValidityPoller.stop()
    })

    this.userManager.events.addUserSignedOut(() => {
      console.log(`addUserSignedOut called`)
      this.userManager.clearStaleState()
      sessionStorage.removeItem(API_TOKEN)
      this.userSessionValidityPoller.stop()
    })

    this.userManager.events.addUserLoaded(async user => {
      console.log(`addUserLoaded called`)

      if (!this._isProcessingLogin && this.isAuthenticatedUser(user)) {
        await this.fetchApiToken(user)
      }
      this.userSessionValidityPoller.start()
    })

    this.userManager.events.addUserUnloaded(() => {
      console.log(`addUserUnloaded called`)
      this.userSessionValidityPoller.stop()
    })
  }

  private getApiClientQueryProps() {
    return this.authServerType === 'KEYCLOAK'
      ? {
        permission: '#access',
        grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      }
      : undefined
  }

  private getApiClientUrl() {
    return this.authServerType === 'KEYCLOAK'
      ? `${this.userManager.settings.authority}/protocol/openid-connect/token`
      : `${this.userManager.settings.authority}api-tokens/`
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser()
  }

  public async getAuthenticatedUser(): Promise<User | null> {
    const user = await this.getUser()
    if (!this.isAuthenticatedUser(user)) {
      return Promise.reject(null)
    }
    this.userSessionValidityPoller.start()
    return Promise.resolve(user)
  }

  public getToken(): string | null {
    return sessionStorage.getItem(API_TOKEN)
  }

  public getAuthServerType(): string | null {
    return this.authServerType
  }

  public isAuthenticatedUser(user?: User | null): boolean {
    return !!user && user.expired !== true && !!user.access_token
  }

  public isAuthenticated(): boolean {
    const userKey = this.getUserStorageKey()
    const oidcStorage = sessionStorage.getItem(userKey)
    const apiTokens = this.getToken()
    const parsedUser = oidcStorage && JSON.parse(oidcStorage)
    return this.isAuthenticatedUser(parsedUser) && !!apiTokens
  }

  private getUserStorageKey() {
    return `oidc.user:${this.userManager.settings.authority}:${this.userManager.settings.client_id}`
  }

  public async login(path = '/'): Promise<void> {
    let success = true
    await this.userManager.signinRedirect({ url_state: path }).catch(error => {
      success = false
      if (!(error instanceof Error)) {
        error = new Error(`Login-rejection: ${JSON.stringify(error)}`);
      }
      // if (error.message !== 'Network Error') {
        Sentry.captureException(error)
      // }
      console.log(error)
    })
    return success ? Promise.resolve() : Promise.reject()
  }

  public async endLogin(): Promise<User> {
    this._isProcessingLogin = true
    const user = await this.userManager.signinRedirectCallback()
    if (!this.isAuthenticatedUser(user)) {
      return Promise.reject(new Error('Login failed - no valid user returned'))
    }
    await this.fetchApiToken(user)
    this._isProcessingLogin = false
    return user
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent()
  }

  public async logout(): Promise<void> {
    sessionStorage.removeItem(API_TOKEN)
    this.userManager.clearStaleState()
    if (this.authServerType === 'TUNNISTAMO') {
      await this.userManager.signoutRedirect()
    }
    if (this.getToken()) {

    }
  }

  async fetchApiToken(user: User): Promise<void> {
    if (this.authServerType === 'TUNNISTAMO') {
      const url = `${process.env.REACT_APP_OIDC_AUTHORITY}api-tokens/`
      const response = await fetch(url, {
        headers: {
          Authorization: `bearer ${user.access_token}`,
        },
      })
      const result = await response.json()
      const apiToken = pickProfileApiToken(result)
      sessionStorage.setItem(API_TOKEN, apiToken)
      return
    }

    try {
      // Store or handle the returned API token
      sessionStorage.setItem(API_TOKEN, user.access_token)

    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch API token', error)
      if (!(error instanceof Error)) {
        // eslint-disable-next-line no-ex-assign
        error = new Error(`Login-rejection: ${JSON.stringify(error)}`);
      }
      Sentry.captureException(error)
    }


  }
}

export default new AuthService()