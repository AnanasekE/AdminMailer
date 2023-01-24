const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        [
            '/api/admin/login',
            '/api/users',
            '/api/users/remove',
            '/api/token/verify',
        ],
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
};