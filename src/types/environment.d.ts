declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      REACT_APP_IS_ANALYTICS?: string;
      REACT_APP_SENTRY_DNS?: string;
      REACT_APP_SKIP_TERMS_ACCEPT_FOR_NAMESPACES?: string;
      REACT_APP_ORDER_API_URL?: string;
      REACT_APP_PAYMENT_API_URL?: string;
      REACT_APP_MERCHANT_API_URL?: string;
      REACT_APP_AXIOS_RETRY_COUNT?: number;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}