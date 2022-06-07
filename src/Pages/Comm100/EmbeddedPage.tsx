import { useEffect, useRef } from "react";
import { Title, useDataProvider } from "react-admin";
import { Card } from "@mui/material";

export interface EmbeddedPageProps {
  title: string;
  installCodeKeyName:
    | "Comm100 Control Panel Js Code"
    | "Comm100 Agent Console Js Code";
}

export const EmbeddedPage = ({
  title = "",
  installCodeKeyName,
}: EmbeddedPageProps) => {
  const id = title.replace(/\s/g, "-");
  const elRef = useRef<any>(null);
  const dataProvider = useDataProvider();

  const init = (snippet: string) => {
    var iframe = document.createElement("iframe");
    elRef.current.appendChild(iframe);
    var innerDoc = iframe.contentDocument!;
    iframe.id = "comm100-iframe" + id;
    iframe.style.width = "100%";
    iframe.style.height = "720px";
    iframe.style.border = "none";
    innerDoc.open();
    innerDoc.write(snippet);
    innerDoc.close();
    return () => {
      if (elRef.current) {
        elRef.current.removeChild(iframe);
      }
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
          (item) => item.optionKey === installCodeKeyName
        );
        if (target) {
          // TODO: find the siteid.
          return init(target.optionValue);
        }
      }
    });
  }, []);

  return (
    <Card sx={{ p: 3, mt: 3 }}>
      <Title title={title} />
      <div id={"comm100-" + id} ref={elRef}></div>
    </Card>
  );
};
