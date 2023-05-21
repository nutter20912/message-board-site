import Echo from 'laravel-echo';
import storage from './storage';

window.Pusher = require('pusher-js');

const token = storage.get('token') ?? '';

window.Echo = new Echo({
  broadcaster: process.env.REACT_APP_PUSHER_BROADCASTER || '',
  key: process.env.REACT_APP_PUSHER_KEY || '',
  wsHost: '127.0.0.1',
  wsPort: process.env.REACT_APP_PUSHER_PORT || 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  auth: {
    headers: { Authorization: `Bearer ${token}` },
  },
});

export default window.Echo;
