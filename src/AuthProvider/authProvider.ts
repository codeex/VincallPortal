import { AuthProvider } from "react-admin";
import { getServerURL } from "../App";
import { customHttpClient } from "../DataProvider/customHttpClient";
import { tokenManager } from "../DataProvider/tokenManager";
import jwt_decode from "jwt-decode";

export const authProvider: AuthProvider = {
  login: (auth: any) => {
    return customHttpClient(`${getServerURL()}/vincallToken`, {
      method: "POST",
      body: JSON.stringify(auth),
    })
      .then((res) => {
        tokenManager.setToken(res.json.access_token);
        localStorage.setItem("userName", res.json.userName);
        localStorage.setItem("userId", res.json.userId);
        localStorage.setItem("vincall-role", res.json.role);
        localStorage.setItem("userAccount", res.json.userAccount);
        return Promise.resolve();
      })
      .catch((err) => {
        return Promise.reject();
      });
  },
  logout: () => {
    tokenManager.removeToken();
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("vincall-role");
    localStorage.removeItem("userAccount");
    return Promise.resolve();
  },
  checkAuth: () => {
    const token = tokenManager.getToken();
    if (!token) {
      return Promise.reject();
    }
    const decoded = jwt_decode(token) as { [key: string]: number };
    return decoded.exp > Date.now() / 1000 + 60 * 5
      ? Promise.resolve()
      : Promise.reject();
  },
  checkError: (error: any) => {
    return Promise.resolve();
  },
  getIdentity: () => {
    return Promise.resolve({
      id: localStorage.getItem("userId") || "Unknown",
      fullName: localStorage.getItem("userName") || "Unknown",
      account: localStorage.getItem("userAccount") || "",
      role: localStorage.getItem("vincall-role"),
    });
  },
  getPermissions: () => {
    return Promise.resolve(localStorage.getItem("vincall-role"));
  },
};
