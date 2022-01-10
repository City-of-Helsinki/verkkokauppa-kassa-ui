import defaultTo from 'lodash/defaultTo';

const config = {
  clientId: process.env.REACT_APP_OIDC_CLIENT_ID,
  environment: process.env.REACT_APP_ENVIRONMENT,
  helsinkiAccountAMR: defaultTo(
    process.env.REACT_APP_HELSINKI_ACCOUNT_AMR,
    'helusername'
  ),
  oidcAuthority: process.env.REACT_APP_OIDC_AUTHORITY,
  identityProviderManagementUrlHelsinki: defaultTo(
    process.env.REACT_APP_IPD_MANAGEMENT_URL_HELSINKI_ACCOUNT,
    'https://salasana.hel.ninja/auth/realms/helsinki-salasana/account'
  ),
  identityProviderManagementUrlTunnistusSuomifi: defaultTo(
    process.env.REACT_APP_IPD_MANAGEMENT_URL_TUNNISTUS_SUOMI_FI,
    'https://suomi.fi'
  ),
  errorPagePath: '/error',
};

export default config;