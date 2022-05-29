export const log = console.log;

const getIsEmbeddedMode = () => {
  const search = location.href.split("?")[1] || "";
  return search.indexOf("isembedded=1") !== -1;
};
export const isEmbeddedMode = getIsEmbeddedMode();
