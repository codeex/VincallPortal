import { Card } from "@mui/material";
import { useListContext, useRedirect } from "react-admin";
import { Button, Typography } from "@mui/material";
import { customHttpClient } from "../../DataProvider/customHttpClient";
import { TextField } from "@mui/material";
import { useRef } from "react";

export interface ConnectComm100Props {
  connected: boolean;
}

export const ConnectComm100 = ({ connected }: ConnectComm100Props) => {
  const redirect = useRedirect();
  const handleConnect = () => {
    const siteId = ref.current;

    const redirect_url = `redirect_uri=https://apivincall.comm100dev.io/sso/callback?siteId=${siteId}&domain=voipdash.comm100dev.io&agentId=52163ba0-7caf-44bc-a17d-b9764f9db4db`;
    const url = window.location.host.includes("test")
      ? `https://voiproute.testing.comm100dev.io/oauth/authorize?siteId=${siteId}&client_id=F39DEFBC-FE17-4091-9541-1F39B79ACEDB&${redirect_url}&response_type=code`
      : `https://voiproute.comm100dev.io/oauth/authorize?siteId=${siteId}&client_id=F39DEFBC-FE17-4091-9541-1F39B79ACEDB&${redirect_url}&response_type=code`;
    window.open(url, "_blank");
    // location.href = url;
    // customHttpClient(url, {
    //   method: "GET",
    //   headers: new Headers({
    //     "access-control-allow-origin": "*",
    //   }),
    // });
  };

  const ref = useRef();
  console.log("ref >>", ref.current);
  return (
    <div style={{ height: 150 }}>
      {!connected ? (
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
