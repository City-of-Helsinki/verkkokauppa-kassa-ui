import axios from "axios";
import { UserKeys } from "../enums/User";
import authService from '../auth/authService';
import HttpStatusCode from "http-status-typed";
import { jsonStorage } from './storage';
import axiosRetry from 'axios-retry';
import { toast } from "react-toastify";

// Exported axios instance with user and content type headers
export const axiosAuth = axios.create()

const onRetry = (retryCount: any, error: any, requestConfig: any) => {
  console.log(`Retry count: ${retryCount} error: ${JSON.stringify(error)} request config: ${JSON.stringify(requestConfig)}`)
  return;
};

// Custom retry delay, retry amount and onRetry console.log for errors.
axiosRetry(axiosAuth, {
  retries: process.env.REACT_APP_AXIOS_RETRY_COUNT || 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
  onRetry
});

//we intercept every requests
axiosAuth.interceptors.request.use(function (config) {
  //anything you want to attach to the requests such as token/user
  config.headers.user = sessionStorage.getItem(UserKeys.Id);
  // Set default headers to application/json
  config.headers.Accept = 'application/json';
  config.headers['Content-Type'] = 'application/json';


  const apiToken = authService.getToken();


  if (apiToken) {
    config.headers['Authorization'] = "Bearer " + apiToken
  }

  const authServerType = authService.getAuthServerType();

  if (authServerType) {
    config.headers['X-Auth-Server-Type'] = authServerType
  }

  return config;
}, error => {
  // Global error logging handler
  // TODO add notification support
  console.log(error)
  return Promise.reject(error)
})

// Add a response interceptor
axiosAuth.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log(error)
  const { set } = jsonStorage(localStorage);
  if (error?.response?.status === HttpStatusCode.INTERNAL_SERVER_ERROR) {
    set(`latest-error-${ error?.response?.status }`, error.response)
  }

  if (error.response.data.errors) {
    toast.warn(`Message: ${error.response.data.errors[0].message} \n Code: ${error.response.data.errors[0].code} `, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  }
  return Promise.reject(error);
});