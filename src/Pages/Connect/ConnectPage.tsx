import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Title, useStore } from "react-admin";
import { customHttpClient } from "../../DataProvider/customHttpClient";
import { ConnectComm100 } from "./ConnectComm100";
import { ConnectList } from "./ConnectList";

export const ConnectPage = () => {
  const [isConnected, setConnected] = useState<boolean>(false);
  const [isComm100Connect, setIsComm100Connect] = useStore<boolean>(
    "isComm100Connect",
    false
  );
  const handleCheckOauth = () => {
    // customHttpClient(
    //   `https://voipdash.comm100dev.io/api/global/agentSsoConfig?siteId=10000`,
    //   {
    //     method: "GET",
    //   }
    // ).then(() => setConnected(true));

    customHttpClient(
      `https://voipdash.comm100dev.io/api/global/agents?siteId=10000`,
      {
        method: "GET",
      }
    ).then((res) => {
      setConnected(true);
      setIsComm100Connect(true);
    });
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
        <ConnectComm100 connected={isConnected} />
        <ConnectList connected={isConnected} />
      </CardContent>
    </Card>
  );
};
