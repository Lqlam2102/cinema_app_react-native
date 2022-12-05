/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import axios from 'axios';
const baseURL = 'https://lqlam2102.pythonanywhere.com';
const endpoints = {
  'oauth2-info': '/oauth2-info/',
  'login': '/o/token/',
  'current-user': '/users/current-user/',
  'register': '/users/',
};
const axiosRoot = axios.create({
  baseURL: baseURL,
});
export {endpoints,baseURL};
export default axiosRoot;