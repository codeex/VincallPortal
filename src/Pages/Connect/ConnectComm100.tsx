import { Card } from "@mui/material";
import { useListContext } from "react-admin";
import { Button, Typography } from "@mui/material";
import { customHttpClient } from "../../DataProvider/customHttpClient";

export interface ConnectComm100Props {
  connected: boolean;
}

export const ConnectComm100 = ({ connected }: ConnectComm100Props) => {
  const handleConnect = () => {
    const redirect_url = `redirect_url=https://api.vincall.net/sso/callback?domain=voipdash.comm100dev.io&agentId=52163ba0-7caf-44bc-a17d-b9764f9db4db&siteId=10000`;
    // const url = `https://voiproute.comm100dev.io/oauth/authorize?client_id=F39DEFBC-FE17-4091-9541-1F39B79ACEDB&${redirect_url}`;
    const url = window.location.host.includes("test")
      ? `https://voiproute.testing.comm100dev.io/oauth/authorize?siteId=10000&client_id=F39DEFBC-FE17-4091-9541-1F39B79ACEDB&${redirect_url}`
      : `https://voiproute.comm100dev.io/oauth/authorize?siteId=10000&client_id=F39DEFBC-FE17-4091-9541-1F39B79ACEDB&${redirect_url}`;
    customHttpClient(url, {
      method: "GET",
      headers: new Headers({
        "access-control-allow-origin": "*",
      }),
    });
  };
  return (
    <div style={{ height: 100 }}>
      {connected ? (
        <Typography>You are already connected.</Typography>
      ) : (
        <Typography>
          You must connect to Comm100 to get account mappings, Please click the
          button below.
          <Button onClick={handleConnect}>Connect Comm100</Button>
        </Typography>
      )}
    </div>
  );
};
