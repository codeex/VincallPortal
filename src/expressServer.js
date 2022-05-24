const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/vincallservice", { target: "https://voipapi.comm100dev.io/" })
  );
};
