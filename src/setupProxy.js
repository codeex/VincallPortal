const { createProxyMiddleware } = require("http-proxy-middleware");

const removeCookieSecure = (proxyRes, req, res) => {
  const sc = proxyRes.headers["set-cookie"];
  if (Array.isArray(sc)) {
    proxyRes.headers["set-cookie"] = sc.map((sc) => {
      return sc
        .split(";")
        .filter((v) => {
          return (
            v.trim().toLowerCase() !== "secure" &&
            !v.trim().toLowerCase().includes("samesite") &&
            !v.trim().toLowerCase().includes("domain")
          );
        })
        .join(";");
    });
  }
  if (!proxyRes.headers["content-type"]) {
    proxyRes.headers["content-type"] = "application/json";
  }
};

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.vincall.net/api",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
      secure: false,
      onProxyRes: removeCookieSecure,
    })
  );
};
