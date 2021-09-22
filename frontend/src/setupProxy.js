const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

function setURL(){
    var url = (process.env.REACT_APP_API_URL) ? process.env.REACT_APP_API_URL : 'localhost:3001'
    return 'http://' + url;
    }

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: setURL(),
      changeOrigin: true,
    })
  );
};