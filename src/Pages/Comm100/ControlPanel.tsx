import { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";
import { GlobalSettings } from "../CallPanel/types";
import { EmbeddedPage } from "./EmbeddedPage";
import { getConnectSiteId } from "../../Helpers/Index";

export interface ControlPanelProps {
  title: string;
  entry: string;
}

export const ControlPanel = ({ title, entry }: ControlPanelProps) => {
  const snippet = useComm100Snippet(getSnippet(entry));
  if (!snippet) {
    return null;
  }
  return <EmbeddedPage title={title} snippet={snippet} />;
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

const getSnippet = (entry: string) => (arg: GlobalSettings, siteId: number) => {
  return `
    <div id="comm100-controlpanel" style="width:100%; height: 100%"></div>
    <script src="${arg.controlPanel}/sdk/comm100-embeddable-sdk/"></script>
    <script>
      var controlPanel = new EmbeddedControlPanel({
        appId: "${arg.controlAppId}",
        siteId: ${siteId},
        entry: "${entry}",
        container: document.getElementById("comm100-controlpanel"),
      });
      controlPanel.init();
    </script>
  `;
};
