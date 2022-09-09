const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware("/api", {
      target: "http://210.119.108.237:3000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );

  app.use(
    "/noticeDetail",
    createProxyMiddleware("/noticeDetail", {
      target: "http://210.119.108.237:3000",
      changeOrigin: true,
      pathRewrite: {
        "^/noticeDetail": "",
      },
    })
  );
};
