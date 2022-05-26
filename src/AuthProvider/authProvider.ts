import { AuthProvider } from "react-admin";
import { customHttpClient } from "../DataProvider/customHttpClient";
import { EnvConfig } from "../EnvConfig";

export const authProvider: AuthProvider = {
  login: (auth: any) => {
    return customHttpClient(`${EnvConfig.serverUrl}/vincallToken`, {
      method: "POST",
      body: JSON.stringify(auth),
    })
      .then((res) => {
        localStorage.removeItem("refresh_token");
        localStorage.setItem("refresh_token", res.json.refresh_token);
        return Promise.resolve();
      })
      .catch((err) => {
        return Promise.reject();
      });
  },
  logout: () => {
    return Promise.resolve();
  },
  checkAuth: () => {
    return Promise.resolve();
  },
  checkError: (error: any) => {
    return Promise.resolve();
  },
  getIdentity: () => {
    return Promise.resolve({
      id: "user",
      fullName: "John Doe",
    });
  },
  getPermissions: () => {
    return Promise.resolve();
  },
};
