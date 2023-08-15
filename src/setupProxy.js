const {createProxyMiddleware} = require("http-proxy-middleware")

module.exports = function (app) {
    const isDockerEnv =  process.env.REACT_APP_ENV === "docker"
    let proxy = 'http://localhost:8080/';
    if(isDockerEnv) {
        proxy = 'http://chatapp-backend:8080/'
    }
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