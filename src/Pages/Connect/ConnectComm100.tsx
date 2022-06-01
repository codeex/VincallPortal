import { Card } from "@mui/material";
import { useListContext, useRedirect } from "react-admin";
import { Button, Typography } from "@mui/material";
import { customHttpClient } from "../../DataProvider/customHttpClient";
import { TextField } from "@mui/material";

export interface ConnectComm100Props {
  connected: boolean;
}

export const ConnectComm100 = ({ connected }: ConnectComm100Props) => {
  const redirect = useRedirect();
  const handleConnect = () => {
    const redirect_url = `redirect_uri=https://apivincall.comm100dev.io/sso/callback?domain=voipdash.comm100dev.io&agentId=52163ba0-7caf-44bc-a17d-b9764f9db4db&siteId=10000`;
    const url = window.location.host.includes("test")
      ? `https://voiproute.testing.comm100dev.io/oauth/authorize?siteId=10000&client_id=F39DEFBC-FE17-4091-9541-1F39B79ACEDB&${redirect_url}&response_type=code`
      : `https://voiproute.comm100dev.io/oauth/authorize?siteId=10000&client_id=F39DEFBC-FE17-4091-9541-1F39B79ACEDB&${redirect_url}&response_type=code`;
    redirect(url);
    // location.href = url;
    // customHttpClient(url, {
    //   method: "GET",
    //   headers: new Headers({
    //     "access-control-allow-origin": "*",
    //   }),
    // });
  };
  return (
    <div style={{ height: 100 }}>
      {connected ? (
        <Typography>You are already connected.</Typography>
      ) : (
        <Typography>
          You must connect to Comm100 to get account mappings, Please click the
          button below.
          <TextField
            label="Site ID"
            variant="outlined"
            onChange={(e: any) => console.log(e.target)}
          />
          <Button onClick={handleConnect}>Connect Comm100</Button>
        </Typography>
      )}
    </div>
  );
};
