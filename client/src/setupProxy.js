const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
  
  app.use(createProxyMiddleware('/api/**', {
    target: 'http://localhost:7000/',
    changeOrigin: true,
    secure: false,
  }));

  app.use(
    createProxyMiddleware("/apis/**",{
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
