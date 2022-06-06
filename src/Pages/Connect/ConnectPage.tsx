import { Card, CardContent } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Title, useStore } from "react-admin";
import { getServerURL } from "../../App";
import { customHttpClient } from "../../DataProvider/customHttpClient";
import { ConnectComm100 } from "./ConnectComm100";
import { ConnectList } from "./ConnectList";
import { useEventCallback } from "@mui/material";

export const ConnectPage = () => {
  const [isConnected, setConnected] = useState<boolean>(false);
  const [isComm100Connect, setIsComm100Connect] = useStore<boolean>(
    "isComm100Connect",
    false
  );
  const [shouldPageRefresh, setShouldPageRefresh] = useState<boolean>(false);

  // const [siteId, setSiteId] = useState<number | undefined>(undefined);
  // const handleSiteId = useCallback((siteId: number | undefined) => {
  //   // may use LocalStorage instead
  //   // console.log("siteId >>", siteId);
  //   // console.log("test...");
  //   setSiteId(siteId);
  // }, []);

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
  //@ts-ignore
  window.setIsComm100Connect = setIsComm100Connect;
  useEffect(() => {
    handleCheckOauth();
  }, []);

  return (
    <Card>
      <Title title="Connect Comm100" />
      <CardContent>
        <ConnectComm100
          connected={isConnected}
          // handleSiteId={handleSiteId}
          setConnected={handleUpdateIsConnect}
          triggerPageRefresh={triggerPageRefresh}
          connectInfo={connectInfo}
        />
        <ConnectList
          connected={isConnected}
          shouldPageRefresh={shouldPageRefresh}
          refresh={refresh}
          handleRefresh={handleRefresh}
          connectInfo={connectInfo}
        />
      </CardContent>
    </Card>
  );
};
