import { Card, CardContent } from "@mui/material";
import { useEffect } from "react";
import { Title } from "react-admin";
import { ConnectComm100 } from "./ConnectComm100";
import { ConnectList } from "./ConnectList";
import { connectPageApp } from "./Application/ConnectPageApp";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { CircularProgressStyled } from "../../StyledComponents/CircularProgressStyled";

export const ConnectPage = () => {
  const {
    isConnected,
    setIsComm100Connect,
    shouldPageRefresh,
    refresh,
    connectInfo,
    handleRefresh,
    triggerPageRefresh,
    handleCheckOauth,
    handleUpdateIsConnect,
    getState,
  } = connectPageApp({});
  //@ts-ignore
  window.setIsComm100Connect = setIsComm100Connect;
  useEffect(() => {
    handleCheckOauth();
  }, []);

  return (
    <Card>
      <Title title="Connect Comm100" />
      <CardContent>
        {getState ? (
          <>
            <ConnectComm100
              connected={isConnected}
              setConnected={handleUpdateIsConnect}
              triggerPageRefresh={triggerPageRefresh}
              connectInfo={connectInfo}
            />
            <ConnectList
              connected={isConnected}
              shouldPageRefresh={shouldPageRefresh}
              refresh={refresh}
              handleRefresh={handleRefresh}
            />
          </>
        ) : (
          <CircularProgressStyled>
            <CircularProgress />
          </CircularProgressStyled>
        )}
      </CardContent>
    </Card>
  );
};
