import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useRef } from "react";
import { getServerURL } from "../../App";
import { customHttpClient } from "../../DataProvider/customHttpClient";
import { EnvConfig } from "../../EnvConfig";

export interface ConnectComm100Props {
  connected: boolean;
  handleSiteId: (siteId: number | undefined) => void;
  setConnected: any;
  triggerPageRefresh: any;
}

export const ConnectComm100 = ({
  connected,
  handleSiteId,
  setConnected,
  triggerPageRefresh,
}: ConnectComm100Props) => {
  const handleConnect = () => {
    const siteId = ref.current;
    localStorage.setItem("connectSiteId", siteId || "");
    customHttpClient(`${getServerURL()}/sso/connectinfo`, {
      method: "GET",
    }).then((res: any) => {
      const redirect_url = `${EnvConfig.serverUrl}/sso/connectcallback?siteId=${siteId}&domain=${res.json.domain}`;
      const url = `${
        EnvConfig.routeUrl
      }/oauth/authorize?siteId=${siteId}&client_id=${
        res.json.clientId
      }&redirect_uri=${encodeURIComponent(redirect_url)}&response_type=code`;
      // const url = `${EnvConfig.routeUrl}/oauth/authorize?siteId=${siteId}&client_id=F39DEFBC-FE17-4091-9541-1F39B79ACEDE&${redirect_url}&response_type=code`;
      console.log("redirectUri >>", redirect_url);
      console.log("url >>", url);
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
    });

    handleSiteId(ref.current);
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

  const ref = useRef();
  return (
    <div style={{ height: 150 }}>
      {connected ? (
        <>
          <Typography>You are already connected.</Typography>
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
