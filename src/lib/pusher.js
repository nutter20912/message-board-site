import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: process.env.REACT_APP_PUSHER_BROADCASTER || '',
  key: process.env.REACT_APP_PUSHER_KEY || '',
  cluster: process.env.REACT_APP_PUSHER_CLUSTER || '',
  // forceTLS: true,
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
});

export default window.Echo;
