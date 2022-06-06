export const log = console.log;

export const isEmbeddedMode = window.top !== window;

export const getConnectSiteId = () =>
  parseInt(localStorage.getItem("connectSiteId") || "0");
