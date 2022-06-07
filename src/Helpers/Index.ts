export const log = console.log;

export const isEmbeddedMode = window.top !== window;

export const getConnectSiteId = () =>
  parseInt(localStorage.getItem("connectSiteId") || "0");

export const toCallTimeString = (time: number): string => {
  let r = "";
  r = format(time % 60);
  time = Math.floor(time / 60);
  r = format(time % 60) + ":" + r;
  time = Math.floor(time / 60);
  r = time + ":" + r;
  return r;
};

const format = (time: number): string => {
  if (!time) {
    return "00";
  }
  if (time < 9) {
    return `0${time}`;
  }
  return String(time);
};
