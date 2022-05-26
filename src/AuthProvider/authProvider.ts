import { AuthProvider } from "react-admin";
import { getServerURL } from "../App";
import { customHttpClient } from "../DataProvider/customHttpClient";

export const authProvider: AuthProvider = {
  login: (auth: any) => {
    return customHttpClient(`${getServerURL()}/vincallToken`, {
      method: "POST",
      body: JSON.stringify(auth),
    })
      .then((res) => {
        localStorage.removeItem("userName");
        localStorage.setItem("userName", res.json.userName);
        localStorage.removeItem("userId");
        localStorage.setItem("userId", res.json.userId);
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
      id: localStorage.getItem("userId") || "Unknown",
      fullName: localStorage.getItem("userName") || "Unknown",
    });
  },
  getPermissions: () => {
    return Promise.resolve();
  },
};
