function getSearch() {
  var search = decodeURIComponent(location.href).split("?")[1] || "",
    searchList = search.split("&").map((item) => item.split("=")) || [],
    searchObject = searchList.reduce((pre, current) => {
      pre[current[0]] = current[1];
      return pre;
    }, {});
  return searchObject;
}
