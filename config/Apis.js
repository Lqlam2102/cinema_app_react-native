/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import axios from 'axios';
const endpoints = {
  'oauth2-info': '/oauth2-info/',
  'login': '/o/token/',
  'current-user': '/users/current-user/',
  'register': '/users/',
};
const axiosRoot = axios.create({
  baseURL: 'http://192.168.0.102:8000',
});
export {endpoints};
export default axiosRoot;
