import { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";
import { getConnectSiteId, log } from "../../Helpers/Index";
import { Embedded } from "./Embedded";

export const AgentConsolePanel = () => {
  const [snippet, setSnippet] = useState<string>("");
  const siteId = getConnectSiteId();
  const dataProvider = useDataProvider();

  const updateSnippet = () => {
    dataProvider
      .httpGet("globalSetting", { type: "installcode" })
      .then(({ data = [] }: { data: any[] }) => {
        const obj: { [key: string]: string } = data.reduce((pre, current) => {
          pre[current.key] = current.value;
          return pre;
        }, {});
        setSnippet(getSnippet(obj.agentConsole, obj.agentAppId, siteId));
      });
  };

  useEffect(() => {
    updateSnippet();
  }, []);

  if (!snippet) {
    return null;
  }
  return <Embedded title="agent console" snippet={snippet} />;
};

const getSnippet = (domain: string, appId: string, siteId: number) => {
  return `
  <div id="comm100-agentconsole"></div>
  <script src="${domain}/sdk/comm100-embedded-client.js"></script>
  <script>
    var ac = new EmbeddedAgentConsole({
      appId: "${appId}",
      siteId: ${siteId},
      modules: ["chat"],
      container: document.getElementById("comm100-agentconsole"),
    });
    var client = ac.init();
    ac.init().then(client=>{
      console.log("AgentConsolePanel", client);
      window.top.__comm100_client = client;
      window.top.Runtime.init();
    });
  </script>
  `;
};
