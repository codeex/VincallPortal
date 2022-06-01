const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://apivincall.comm100dev.io",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
      secure: false,
    })
  );
};
