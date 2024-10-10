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
};
