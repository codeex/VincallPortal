const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.vincall.net",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
      secure: false,
    })
  );
};
