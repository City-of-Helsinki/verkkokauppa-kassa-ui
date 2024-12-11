#### Using the Helsinki-Profile Keycloak instead of Tunnistamo
> It is planned that the Tunnistamo will be replaced with Helsinki-Profile Keycloak during the summer of 2024.
There is an [example of Keycloak environment variables](./.env.local.keycloak-example)
The example file should include some what the following variables, that are telling the app to change the behavior of the authorization provider a bit, compared to how it is with Tunnistamo.
- `REACT_APP_OIDC_SERVER_TYPE=KEYCLOAK` is to add some parameters to the token-request that the Keycloak service needs. As a comparison, by default it is working as `REACT_APP_AUTH_SERVER_TYPE=TUNNISTAMO`).
- `REACT_APP_OIDC_RETURN_TYPE=code` is to use authorization code flow instead of deprecated (and even removed from `oidc-client-ts`) implicit flow.
- `REACT_APP_OIDC_AUTHORITY` tells where the authorization service is located and who the issuer of the JWT is.
- `REACT_APP_OIDC_CLIENT_ID` is the unique client id that is used when the client is configured to auth service.
- `REACT_APP_OIDC_SCOPE="openid profile"` tells that the  UI needs the openid and profile information to be included in the JWT.
- `REACT_APP_OIDC_AUDIENCES=kukkuu-api-dev` means that when the authorization is given, the access is needed to these clients too, so the api-tokens needs to be generated.
- `REACT_APP_OIDC_KUKKUU_API_CLIENT_ID` is used collect the proper auth token for communication between the Admin UI and the API.
  Example configuration when a local Kukkuu API is used with a local Kukkuu Admin UI and Helsinki-Profile Keycloak from the test environment:
```shell
# Lokaali
REACT_APP_AUTH_SERVER_TYPE=KEYCLOAK
REACT_APP_KEYCLOAK_OIDC_AUTHORITY=https://tunnistus.test.hel.ninja/auth/realms/helsinki-tunnistus
REACT_APP_KEYCLOAK_OIDC_CALLBACK_PATH=https://localhost:3000/auth/helsinki/tunnistus/return
REACT_APP_KEYCLOAK_OIDC_CLIENT_ID=talpa-verkkokauppa-ui-dev
REACT_APP_KEYCLOAK_OIDC_RESPONSE_TYPE=code
REACT_APP_KEYCLOAK_OIDC_SCOPE=openid profile
REACT_APP_KEYCLOAK_OIDC_SILENT_AUTH_PATH=https://localhost:3000/auth/helsinki/tunnistus/silent

# Test
REACT_APP_AUTH_SERVER_TYPE=KEYCLOAK
REACT_APP_KEYCLOAK_OIDC_AUTHORITY=https://tunnistus.test.hel.ninja/auth/realms/helsinki-tunnistus
REACT_APP_KEYCLOAK_OIDC_CALLBACK_PATH=https://checkout-test.test.hel.ninja/auth/helsinki/tunnistus/return
REACT_APP_KEYCLOAK_OIDC_CLIENT_ID=talpa-verkkokauppa-ui-test
REACT_APP_KEYCLOAK_OIDC_RESPONSE_TYPE=code
REACT_APP_KEYCLOAK_OIDC_SCOPE=openid profile
REACT_APP_KEYCLOAK_OIDC_SILENT_AUTH_PATH=https://checkout-test.test.hel.ninja/auth/helsinki/tunnistus/silent

# Stg
REACT_APP_AUTH_SERVER_TYPE=KEYCLOAK
REACT_APP_KEYCLOAK_OIDC_AUTHORITY=https://tunnistus.stage.hel.ninja/auth/realms/helsinki-tunnistus
REACT_APP_KEYCLOAK_OIDC_CALLBACK_PATH=https://checkout-staging.hel.fi/auth/helsinki/tunnistus/return
REACT_APP_KEYCLOAK_OIDC_CLIENT_ID=talpa-verkkokauppa-ui-stage
REACT_APP_KEYCLOAK_OIDC_RESPONSE_TYPE=code
REACT_APP_KEYCLOAK_OIDC_SCOPE=openid profile
REACT_APP_KEYCLOAK_OIDC_SILENT_AUTH_PATH=https://checkout-staging.hel.fi/auth/helsinki/tunnistus/silent

# Prod change to KEYCLOAK if testing successful in stg and configured in prod by helsinki profile team!
REACT_APP_AUTH_SERVER_TYPE=KEYCLOAK
REACT_APP_KEYCLOAK_OIDC_AUTHORITY=https://tunnistus.hel.fi/auth/realms/helsinki-tunnistus
REACT_APP_KEYCLOAK_OIDC_CALLBACK_PATH=https://checkout.hel.fi/auth/helsinki/tunnistus/return
REACT_APP_KEYCLOAK_OIDC_CLIENT_ID=talpa-verkkokauppa-ui
REACT_APP_KEYCLOAK_OIDC_RESPONSE_TYPE=code
REACT_APP_KEYCLOAK_OIDC_SCOPE=openid profile
REACT_APP_KEYCLOAK_OIDC_SILENT_AUTH_PATH=https://checkout.hel.fi/auth/helsinki/tunnistus/silent

```