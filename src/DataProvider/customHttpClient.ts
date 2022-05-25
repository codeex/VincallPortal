import { fetchUtils, Options } from "ra-core";
import { tokenManager } from "./tokenManager";

export const customHttpClient = (url: string, options?: Options) => {
  let _options = options;
  if (!_options) {
    _options = {};
  }
  if (!_options.headers) {
    _options.headers = new Headers();
  }
  const token = tokenManager.getToken();
  if (token) {
    (_options.headers as any).set("Authorization", `Bearer ${token}`);
  }

  return fetchUtils.fetchJson(url, _options);
};
