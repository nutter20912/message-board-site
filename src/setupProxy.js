const { createProxyMiddleware } = require('http-proxy-middleware');

const API_HOST = 'http://localhost:8000';

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: API_HOST,
      changeOrigin: true,
    }),
  );

  app.use(
    '/broadcasting',
    createProxyMiddleware({
      target: API_HOST,
      changeOrigin: true,
    }),
  );
};
