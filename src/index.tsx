import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import './i18nInit';

if (process.env.REACT_APP_SENTRY_DNS) {
  Sentry.init({
    dsn: `${process.env.REACT_APP_SENTRY_DNS}`,
    integrations: [new Integrations.BrowserTracing()],
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT || '',
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
  console.log(process.env.REACT_APP_SENTRY_DNS)
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
