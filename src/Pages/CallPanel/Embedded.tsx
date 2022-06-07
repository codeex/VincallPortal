import { useEffect, useRef } from "react";
import { useDataProvider } from "react-admin";
import { Card } from "@mui/material";

export interface EmbeddedProps {
  title: string;
  snippet: string;
}

export const Embedded = ({ title = "", snippet }: EmbeddedProps) => {
  const id = title.replace(/\s/g, "-");
  const elRef = useRef<any>(null);
  const init = (snippet: string) => {
    var iframe = document.createElement("iframe");
    elRef.current.appendChild(iframe);
    var innerDoc = iframe.contentDocument!;
    iframe.id = "vincall-comm100-iframe" + id;
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
    };
  };

  useEffect(() => {
    if (elRef.current.isMounted) {
      return;
    }
    elRef.current.isMounted = true;
    return init(snippet);
  }, []);

  return <div id={"vincall-comm100-" + id} ref={elRef}></div>;
};
