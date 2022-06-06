import { useRef, useState } from "react";
import { getServerURL } from "../../../App";
import { customHttpClient } from "../../../DataProvider/customHttpClient";
import { EnvConfig } from "../../../EnvConfig";

export interface ConnectComm100AppProps {
  setConnected: any;
  triggerPageRefresh: any;
  connectInfo: any;
}

export interface ConnectComm100ButtonApp {
  handleConnect: () => void;
  handleDisconnect: () => void;
  ref: any;
}

export const connectComm100App = ({
  setConnected,
  triggerPageRefresh,
  connectInfo,
}: ConnectComm100AppProps): ConnectComm100ButtonApp => {
  const ref = useRef();

  const handleConnect = () => {
    const siteId = ref.current;
    localStorage.setItem("connectSiteId", siteId || "");
    // customHttpClient(`${getServerURL()}/sso/connectinfo`, {
    //   method: "GET",
    // }).then((res: any) => {
    const redirect_url = `${EnvConfig.serverUrl}/sso/connectcallback?siteId=${siteId}&domain=${connectInfo.domain}`;
    const url = `${
      EnvConfig.routeUrl
    }/oauth/authorize?siteId=${siteId}&client_id=${
      connectInfo.clientId
    }&redirect_uri=${encodeURIComponent(redirect_url)}&response_type=code`;
    // @ts-ignore
    window.__refreshComm100Connect = triggerPageRefresh;
    window.open(
      url,
      "ConnectPage",
      `
        width = 500,
        height = 600,
        left = 0,
        top = 0,
        menubar = false,
        toolbar = false,
        location = false,
        resizable = true,
        scrollbars = true
      `
    );
    // });

    // handleSiteId(ref.current);
  };

  const handleDisconnect = () => {
    customHttpClient(
      `${getServerURL()}/connectState/disconnect?siteId=${localStorage.getItem(
        "connectSiteId"
      )}`,
      {
        method: "PUT",
      }
    ).then((res: any) => setConnected(res.json.connected));
  };

  return {
    handleConnect,
    handleDisconnect,
    ref,
  };
};
