import axios from "axios";
import { UserKeys } from "../enums/User";

// Exported axios instance with user and content type headers
export const axiosAuth = axios.create()

//we intercept every requests
axiosAuth.interceptors.request.use( function(config){
  //anything you want to attach to the requests such as token/user
  config.headers.user = sessionStorage.getItem(UserKeys.Id);
  // Set default headers to application/json
  config.headers.Accept = 'application/json';
  config.headers['Content-Type'] = 'application/json';

  const userKey = `oidc.user:${process.env.REACT_APP_OIDC_AUTHORITY}:${process.env.REACT_APP_OIDC_CLIENT_ID}`;
  const oidcStorage = sessionStorage.getItem(userKey);
  const parsedUser = oidcStorage && JSON.parse(oidcStorage);
  
  if (parsedUser && parsedUser.id_token) {
    config.headers['Authorization'] = "Bearer "+parsedUser.id_token
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
  return Promise.reject(error);
});