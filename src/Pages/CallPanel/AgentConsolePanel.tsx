import { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";
import { getConnectSiteId, log } from "../../Helpers/Index";
import { Embedded } from "./Embedded";
import { GlobalSettings } from "./types";

let uninstall: any;

export const AgentConsolePanel = () => {
  useComm100Snippet(getSnippet);
  return <div id="comm100-agentconsole" style={{ height: "700px" }}></div>;
  // if (!snippet) {
  //   return null;
  // }
  // return <Embedded title="agent console" snippet={snippet} />;
};

export const useComm100Snippet = (
  getSnippet: (arg: GlobalSettings, siteId: number) => string
) => {
  const dataProvider = useDataProvider();
  const [snippet, setSnippet] = useState<string>("");
  const siteId = getConnectSiteId();
  useEffect(() => {
    console.log("useComm100Snippet is mounted");
    dataProvider
      .httpGet("globalSetting", { type: "installcode" })
      .then(({ data = [] }: { data: any[] }) => {
        const obj = data.reduce((pre, current) => {
          pre[current.key] = current.value;
          return pre;
        }, {}) as GlobalSettings;
        // setSnippet(getSnippet(obj, siteId));
        uninstall = install(obj, siteId);
      });
    return () => {
      if (uninstall) {
        uninstall();
      }
    };
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
      window.top.setTimeout(()=>{
        window.top.Runtime.init();
      },0);
    });
  </script>
  `;
};

const install = (arg: GlobalSettings, siteId: number) => {
  let s2: any;

  const s = document.createElement("script");
  s.src = `${arg.agentConsole}/sdk/comm100-embedded-client.js`;
  s.async = true;
  s.onload = () => {
    s2 = document.createElement("script");
    s2.innerHTML = `
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
    `;
    document.body.appendChild(s2);
  };
  document.body.appendChild(s);
  return () => {
    document.body.removeChild(s);
    if (s2) {
      document.body.removeChild(s2);
    }
  };
};
