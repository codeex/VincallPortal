import { useComm100Snippet } from "../CallPanel/AgentConsolePanel";
import { GlobalSettings } from "../CallPanel/types";
import { EmbeddedPage } from "./EmbeddedPage";

export const ControlPanel = () => {
  const snippet = useComm100Snippet(getSnippet);
  return <EmbeddedPage title="Install Code" snippet={snippet} />;
};

const getSnippet = (arg: GlobalSettings, siteId: number) => {
  return `
  <div id="comm100-controlpanel" style="width:100%; height: 100%"></div>
  <script src="${arg.controlPanel}/sdk/comm100-embedded-client.js"></script>
  <script>
    var controlPanel = new EmbeddedControlPanel({
      appId: "${arg.controlAppId}",
      siteId: ${siteId},
      entry: "/livechat/campaign/installation/",
      container: document.getElementById("comm100-controlpanel"),
    });
    controlPanel.init();
  </script>
  `;
};
