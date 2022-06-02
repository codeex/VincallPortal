import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useRef } from "react";
import { EnvConfig } from "../../EnvConfig";

export interface ConnectComm100Props {
  connected: boolean;
  handleSiteId: (siteId: number) => void;
}

export const ConnectComm100 = ({
  connected,
  handleSiteId,
}: ConnectComm100Props) => {
  const handleConnect = () => {
    const siteId = ref.current;
    localStorage.setItem("connectSiteId", siteId || "");
    const redirect_url = `${EnvConfig.redirectUrlDomain}/sso/callback?siteId=${siteId}&domain=voipdash.comm100dev.io`;
    const url = `${
      EnvConfig.routeUrl
    }/oauth/authorize?siteId=${siteId}&client_id=F39DEFBC-FE17-4091-9541-1F39B79ACEDE&redirect_uri=${encodeURIComponent(
      redirect_url
    )}&response_type=code`;
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

    handleSiteId(ref.current || 0);
  };

  const ref = useRef();
  return (
    <div style={{ height: 150 }}>
      {connected ? (
        <Typography>You are already connected.</Typography>
      ) : (
        <Typography>
          You must connect to Comm100 to get account mappings, Please click the
          button below.
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
        </Typography>
      )}
    </div>
  );
};
