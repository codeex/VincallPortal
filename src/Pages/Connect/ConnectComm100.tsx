import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { connectComm100App } from "./Application/ConnectComm100App";

export interface ConnectComm100Props {
  connected: boolean;
  setConnected: any;
  triggerPageRefresh: any;
  connectInfo: any;
}

export const ConnectComm100 = ({
  connected,
  setConnected,
  triggerPageRefresh,
  connectInfo,
}: ConnectComm100Props) => {
  const { handleConnect, handleDisconnect, ref } = connectComm100App({
    setConnected,
    triggerPageRefresh,
    connectInfo,
  });

  return (
    <div style={{ height: 150 }}>
      {connected ? (
        <>
          <Typography>You are already connected.</Typography>
          <Typography>
            Connected Site ID:{" "}
            {localStorage.getItem("connectSiteId") || ref.current}
          </Typography>
          <Button variant="contained" onClick={handleDisconnect}>
            Disconnect Comm100
          </Button>
        </>
      ) : (
        <>
          <Typography>
            You must connect to Comm100 to get account mappings, Please click
            the button below.
          </Typography>
          <div>
            <TextField
              label="Site ID"
              variant="outlined"
              onChange={(e: any) => (ref.current = e.target.value)}
            />
          </div>
          <div>
            <Button variant="contained" onClick={handleConnect}>
              Connect Comm100
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
