import { request } from '../lib';

const Notification = {
  getIndex: ({ page = 1 } = {}) => request('get', '/api/notifications', { page }),
  show: ({ id }) => request('get', `/api/notifications/${id}`),
};

export default Notification;
