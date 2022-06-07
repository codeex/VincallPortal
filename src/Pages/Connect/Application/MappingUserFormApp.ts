import { useState } from "react";
import { customHttpClient } from "../../../DataProvider/customHttpClient";

export interface MappingUserFormAppProps {
  connectInfo: any;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface MappingUserFormApp {
  agentOptions: SelectOption[];
  isAgentLoading: boolean;
  handleLoad: () => void;
}

export const mappingUserFormApp = ({
  connectInfo,
}: MappingUserFormAppProps): MappingUserFormApp => {
  const [agentOptions, setOptions] = useState<SelectOption[]>([]);
  const [isAgentLoading, setLoading] = useState<boolean>(true);
  const handleLoad = () => {
    setLoading(true);
    customHttpClient(
      `${connectInfo.domain}/api/global/agents?siteId=${localStorage.getItem(
        "connectSiteId"
      )}`,
      {
        method: "GET",
      }
    ).then((res) => {
      setOptions(res.json.map((j: any) => ({ label: j.email, value: j.id })));
      setLoading(false);
    });
  };

  return {
    agentOptions,
    isAgentLoading,
    handleLoad,
  };
};
