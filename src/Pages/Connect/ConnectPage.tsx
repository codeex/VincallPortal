import { Card, CardContent } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Title, useStore } from "react-admin";
import { getServerURL } from "../../App";
import { customHttpClient } from "../../DataProvider/customHttpClient";
import { ConnectComm100 } from "./ConnectComm100";
import { ConnectList } from "./ConnectList";

export const ConnectPage = () => {
  const [isConnected, setConnected] = useState<boolean>(false);
  const [isComm100Connect, setIsComm100Connect] = useStore<boolean>(
    "isComm100Connect",
    false
  );
  const [siteId, setSiteId] = useState<number>(0);
  const handleSiteId = useCallback((siteId: number) => {
    // may use LocalStorage instead
    // console.log("siteId >>", siteId);
    // setSiteId(siteId);
  }, []);

  const handleCheckOauth = () => {
    customHttpClient(
      `${getServerURL()}/connectState?siteId=${localStorage.getItem(
        "connectSiteId"
      )}`,
      {
        method: "GET",
      }
    ).then((res) => {
      setConnected(res.json.connected);
      setIsComm100Connect(res.json.connected);
    });
  };
  //@ts-ignore
  window.setIsComm100Connect = setIsComm100Connect;
  useEffect(() => {
    console.log("test...");
    handleCheckOauth();
  }, [localStorage.getItem("connectSiteId")]);
  return (
    <Card>
      <Title title="Connect Comm100" />
      <CardContent>
        <ConnectComm100 connected={isConnected} handleSiteId={handleSiteId} />
        <ConnectList connected={isConnected} />
      </CardContent>
    </Card>
  );
};
