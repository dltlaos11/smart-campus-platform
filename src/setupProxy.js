const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://210.119.108.237:3000",
      // target: "http://210.119.108.237:3001", local
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
