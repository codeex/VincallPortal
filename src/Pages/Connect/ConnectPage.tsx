import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Title } from "react-admin";
import { customHttpClient } from "../../DataProvider/customHttpClient";
import { ConnectComm100 } from "./ConnectComm100";
import { ConnectList } from "./ConnectList";

export const ConnectPage = () => {
  const [isConnected, setConnected] = useState<boolean>(false);
  const handleCheckOauth = () => {
    customHttpClient(
      `https://voipdash.comm100dev.io/api/global/agentSsoConfig`,
      {
        method: "GET",
      }
    ).then(() => setConnected(true));
  };

  useEffect(() => {
    handleCheckOauth();
  }, []);
  return (
    <Card>
      <Title title="Connect Comm100" />
      <CardContent>
        <ConnectComm100 connected={isConnected} />
        <ConnectList />
      </CardContent>
    </Card>
  );
};
