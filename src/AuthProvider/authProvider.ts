import { AuthProvider } from "react-admin";
import { customHttpClient } from "../DataProvider/customHttpClient";

export const authProvider: AuthProvider = {
  login: (auth: any) => {
    console.log("auth >>", auth);
    customHttpClient("/vincallToken", {
      method: "POST",
      body: JSON.stringify(auth),
    }).then((res) => {
      console.log("res >>", res);
    });
    return Promise.resolve();
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
