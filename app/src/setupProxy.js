const { createProxyMiddleware } = require("http-proxy-middleware");

// console.log("====>host:", process.env.REACT_APP_HOST)
// console.log("====>port:", process.env.REACT_APP_PORT)


// app可以理解为一个express实例
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: "http://127.0.0.1:8000",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/"
            }
        })
    );
}