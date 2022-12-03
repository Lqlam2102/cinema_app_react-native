/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import axios from 'axios';
const baseURL = 'http://192.168.0.104:8000'
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