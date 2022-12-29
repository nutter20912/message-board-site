import { request } from '../lib';

export { default as Comment } from './Comment';
export { default as Notification } from './Notification';
export { default as Post } from './Post';

export const getCsrfCookie = () => request('get', '/api/auth/csrf-cookie');

export const userLogin = ({ email, password }) => request('post', '/api/auth/login', {
  email,
  password,
});

export const userRegister = ({ name, email, password }) => request('post', '/api/users', {
  name,
  email,
  password,
});
