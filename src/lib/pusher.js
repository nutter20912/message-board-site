import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '8468066f09dcfa2c3af5',
  cluster: 'ap3',
  forceTLS: true,
});

export default window.Echo;
