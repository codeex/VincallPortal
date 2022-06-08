import { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";
import { getConnectSiteId } from "../../Helpers/Index";
import { GlobalSettings } from "../CallPanel/types";
import { EmbeddedPage } from "./EmbeddedPage";

export const ControlPanel = () => {
  const snippet = useComm100Snippet(getSnippet);
  if (!snippet) {
    return null;
  }
  return <EmbeddedPage title="Install Code" snippet={snippet} />;
};

const useComm100Snippet = (
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
