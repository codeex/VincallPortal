import { useState } from "react";
import { getServerURL } from "../../../App";
import { customHttpClient } from "../../../DataProvider/customHttpClient";
import { useStore } from "react-admin";
import { useEventCallback } from "@mui/material";

export interface ConnectPageAppProps {}

export interface ConnectPageApp {
  isConnected: boolean;
  setIsComm100Connect: any;
  shouldPageRefresh: boolean;
  refresh: number;
  connectInfo: any;
  handleRefresh: () => void;
  triggerPageRefresh: (connected?: boolean) => void;
  handleCheckOauth: () => void;
  handleUpdateIsConnect: (c: boolean) => void;
}

export const connectPageApp = ({}: ConnectPageAppProps): ConnectPageApp => {
  const [isConnected, setConnected] = useState<boolean>(false);
  const [isComm100Connect, setIsComm100Connect] = useStore<boolean>(
    "isComm100Connect",
    false
  );
  const [shouldPageRefresh, setShouldPageRefresh] = useState<boolean>(false);

  const [refresh, setRefresh] = useState<number>(0);
  const [connectInfo, setConnectInfo] = useState<any>();

  const handleRefresh = useEventCallback(() => {
    setRefresh(refresh === 0 ? 1 : 0);
  });

  const handleUpdateIsConnect = useEventCallback((c: boolean) => {
    setConnected(c);
    setIsComm100Connect(c);
  });

  const triggerPageRefresh = useEventCallback((connected?: boolean) => {
    handleUpdateIsConnect(!!connected);
    setShouldPageRefresh(!shouldPageRefresh);
  });

  const handleCheckOauth = () => {
    customHttpClient(
      `${getServerURL()}/connectState?siteId=${localStorage.getItem(
        "connectSiteId"
      )}`,
      {
        method: "GET",
      }
    ).then((res) => {
      handleUpdateIsConnect(res.json.connected);
    });

    customHttpClient(`${getServerURL()}/sso/connectinfo`, {
      method: "GET",
    }).then((res) => setConnectInfo(res.json));
  };
  return {
    isConnected,
    setIsComm100Connect,
    shouldPageRefresh,
    refresh,
    connectInfo,
    handleRefresh,
    triggerPageRefresh,
    handleCheckOauth,
    handleUpdateIsConnect,
  };
};
