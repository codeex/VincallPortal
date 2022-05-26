import { useEffect, useRef } from "react";

export const AgentConsolePanel = () => {
  const elRef = useRef<any>(null);
  const isMounted = useRef<any>(false);
  const init = () => {
    var iframe = document.createElement("iframe");
    elRef.current.appendChild(iframe);
    var innerDoc = iframe.contentDocument!;
    iframe.id = "comm100-agentconsole-iframe";
    iframe.style.width = "100%";
    iframe.style.height = "720px";
    iframe.style.border = "none";
    innerDoc.open();
    innerDoc.write(`
      <div id="comm100-agentconsole"></div>
      <script src="https://voipdash.testing.comm100dev.io/sdk/comm100-embed-agent-console.js"></script>
      <script>
        var ac = new EmbeddingAgentConsole({
          appId: '',
          siteId: 10000,
          modules: ["visitors"],
          container: document.getElementById("comm100-agentconsole")
        });
        var aa = ac.init();
      </script>
    `);
    innerDoc.close();
    return () => {
      elRef.current.removeChild(iframe);
      elRef.current = null;
    };
  };
  useEffect(() => {
    if (elRef.current && !isMounted.current) {
      isMounted.current = true;
      init();
    }
  }, []);
  return <div id="comm100-agentconsole" ref={elRef}></div>;
};
