const {createProxyMiddleware} = require("http-proxy-middleware")

module.exports = function (app) {
    let proxy = "https://chatapp-backend-pgoz.onrender.com"
    app.use(
        '/api',
        createProxyMiddleware({
            target: proxy,
            changeOrigin: true,
            pathRewrite: {
                "^/api": "",
            },
        })
    );
    let wssProxy = "wss://chatapp-backend-pgoz.onrender.com"
    app.use(
        '/wss-api',
        createProxyMiddleware({
            target: wssProxy,
            changeOrigin: true,
            pathRewrite: {
                "^/wss-api": "",
            },
        })
    );
};
