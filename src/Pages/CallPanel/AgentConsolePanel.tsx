import { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";
import { getConnectSiteId, log } from "../../Helpers/Index";
import { Embedded } from "./Embedded";

export const AgentConsolePanel = () => {
  const elRef = useRef<any>(null);
  const dataProvider = useDataProvider();

  const init = (snippet: string) => {
    var iframe = document.createElement("iframe");
    elRef.current.appendChild(iframe);
    var innerDoc = iframe.contentDocument!;
    iframe.id = "comm100-agentconsole-iframe";
    iframe.style.width = "100%";
    iframe.style.height = "720px";
    iframe.style.border = "none";
    innerDoc.open();
    innerDoc.write(snippet);
    // innerDoc.write(`
    //   <div id="comm100-agentconsole"></div>
    //   <script src="https://voipdash.comm100dev.io/sdk/comm100-embed-agent-console.js"></script>
    //   <script>
    //     var ac = new EmbeddingAgentConsole({
    //       appId: '',
    //       siteId: 10000,
    //       modules: ["visitors"],
    //       container: document.getElementById("comm100-agentconsole")
    //     });
    //     var aa = ac.init();
    //   </script>
    // `);
    innerDoc.close();
    return () => {
      elRef.current.removeChild(iframe);
      elRef.current = null;
    };
  };
  useEffect(() => {
    if (elRef.current.isMounted) {
      return;
    }
    elRef.current.isMounted = true;
    dataProvider.httpGet("/settings").then((res: any) => {
      const settings = (res.data || []) as any[];
      if (settings.length) {
        const target = settings.find(
          (item) => item.optionKey === "Comm100 Agent Console Js Code"
        );
        if (target) {
          return init(target.optionValue);
        }
      }
    });
  }, []);
  return <div id="comm100-agentconsole" ref={elRef}></div>;
};
