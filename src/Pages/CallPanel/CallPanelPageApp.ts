import { useState } from "react";
import { useDataProvider, useGetList, useGetOne } from "react-admin";
import { log } from "../../Helpers/Index";
import { ChangeEvent } from "../../types";
import { AgentBo } from "./CallPanelPage";
import { DeviceManager } from "./DeviceManager";
import { DeviceState } from "./types";

export const callPanelPageApp = () => {
  const [currentAgent, setCurrentAgent] = useState<string>("");
  const { data: agentList = [], isLoading: isAgentLoading } =
    useGetList<AgentBo>(
      "agents",
      {},
      {
        refetchInterval: -1,
        retry: 1,
      }
    );

  const { data: tokenResponse, isLoading: isTokenLoading } = useGetOne(
    "twilioToken",
    {
      id: undefined,
    },
    {
      refetchInterval: -1,
      retry: 1,
    }
  );
  const [deviceState, setDeviceState] = useState<DeviceState>({
    status: "initializing",
  });
  //@ts-ignore
  window.setDeviceState = setDeviceState;

  const handleUpdateDeviceState = (state: Partial<DeviceState>) => {
    setDeviceState(state as any);
  };

  const handleCurrentAgentChange = (e: ChangeEvent<string>) => {
    setCurrentAgent(e.target.value);
  };

  const initDevice = (token: string) => {
    if (token) {
      const deviceManager = new DeviceManager({
        token: token as string,
        updateState: handleUpdateDeviceState,
      });
      deviceManager.onError((e: any) => {});
      return deviceManager;
    }
  };

  return {
    agentList,
    isAgentLoading,
    token: (tokenResponse && tokenResponse.token) || "",
    isTokenLoading,
    deviceState,
    currentAgent,
    handleCurrentAgentChange,
    initDevice,
  };
};
