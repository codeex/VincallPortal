import { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";
import { getConnectSiteId, log } from "../../Helpers/Index";
import { Embedded } from "./Embedded";
import { GlobalSettings } from "./types";

export const AgentConsolePanel = () => {
  const snippet = useComm100Snippet(getSnippet);

  if (!snippet) {
    return null;
  }
  return <Embedded title="agent console" snippet={snippet} />;
};

export const useComm100Snippet = (
  getSnippet: (arg: GlobalSettings, siteId: number) => string
) => {
  const dataProvider = useDataProvider();
  const [snippet, setSnippet] = useState<string>("");
  const siteId = getConnectSiteId();
  useEffect(() => {
    dataProvider
      .httpGet("globalSetting", { type: "installcode" })
      .then(({ data = [] }: { data: any[] }) => {
        const obj = data.reduce((pre, current) => {
          pre[current.key] = current.value;
          return pre;
        }, {}) as GlobalSettings;
        setSnippet(getSnippet(obj, siteId));
      });
  }, []);
  return snippet;
};

const getSnippet = (arg: GlobalSettings, siteId: number) => {
  return `
  <div id="comm100-agentconsole"></div>
  <script src="${arg.agentConsole}/sdk/comm100-embedded-client.js"></script>
  <script>
    var ac = new EmbeddedAgentConsole({
      appId: "${arg.agentAppId}",
      siteId: ${siteId},
      modules: ["chat"],
      container: document.getElementById("comm100-agentconsole"),
    });
    ac.init().then(client=>{
      console.log("AgentConsolePanel", client);
      window.top.__comm100_client = client;
      window.top.Runtime.init();
    });
  </script>
  `;
};
