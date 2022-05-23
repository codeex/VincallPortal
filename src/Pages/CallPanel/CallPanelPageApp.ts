import { useState } from "react";
import { useEventCallback, useGetList } from "react-admin";
import { log } from "../../Helpers/Index";
import { ChangeEvent } from "../../types";
import { AgentBo } from "./CallPanelPage";
import { DeviceManager } from "./DeviceManager";
import { DeviceState } from "./types";

export const callPanelPageApp = () => {
  const { data: agentList = [], isLoading: isAgentLoading } =
    useGetList<AgentBo>("agents");

  const { data: token, isLoading: isTokenLoading } = useGetList("token");

  const [deviceState, setDeviceState] = useState<DeviceState>({
    status: "initializing",
  });

  const handleUpdateDeviceState = useEventCallback(
    (state: Partial<DeviceState>) => {
      setDeviceState(state as any);
    },
    []
  );

  const [currentAgent, setCurrentAgent] = useState<string>("");

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
    token,
    isTokenLoading,
    deviceState,
    currentAgent,
    handleCurrentAgentChange,
    initDevice,
  };
};
