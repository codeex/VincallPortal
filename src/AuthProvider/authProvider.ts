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
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("vincall-role");
    localStorage.removeItem("userAccount");
    return Promise.resolve();
  },
  checkAuth: () => {
    return Promise.resolve();
  },
  checkError: (error: any) => {
    console.log("error.status", error.status);
    if (error.status === 401) {
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("vincall-role");
      localStorage.removeItem("userAccount");
      return Promise.reject("Please login again.");
    }
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
