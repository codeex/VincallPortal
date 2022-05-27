import { useMemo, useRef, useState } from "react";
import { DataProvider, useDataProvider, useGetList } from "react-admin";
import { useEventCallback } from "@mui/material";
import { log } from "../../Helpers/Index";
import { ChangeEvent } from "../../types";
import { AgentBo } from "./CallPanelPage";
import { DeviceManager } from "./DeviceManager";
import { DeviceState } from "./types";

export const callPanelPageApp = () => {
  const [currentAgentId, setCurrentAgentId] = useState<string>("");
  const [tab, setTab] = useState<number>(0);
  const dataProvider = useDataProvider();
  const deviceManager = useRef<DeviceManager>();
  const updateCallTimeTaskId = useRef<any>();

  const { data: agentList = [], isLoading: isAgentLoading } =
    useGetList<AgentBo>(
      "agents",
      {},
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

  const requestForUpdateCallTime = () => {
    log("Ray: requestForUpdateCallTime start.");
    dataProvider.httpGet(`agent/${currentAgentId}/updatetime`);
  };

  const setupUpdateCallTimeTask = () => {
    if (updateCallTimeTaskId.current) {
      clearInterval(updateCallTimeTaskId.current);
    }
    updateCallTimeTaskId.current = setInterval(requestForUpdateCallTime, 5000);
  };

  const clearCallTimeTask = () => {
    log("Ray: requestForUpdateCallTime end.");
    clearInterval(updateCallTimeTaskId.current);
    updateCallTimeTaskId.current = null;
  };

  const handleUpdateDeviceState = useEventCallback(
    (state: Partial<DeviceState>, shouldUseAssign?: boolean) => {
      if (shouldUseAssign) {
        setDeviceState(Object.assign({}, deviceState, state));
      } else {
        setDeviceState(state as any);
      }
      if (
        state.status === "incomingAccept" ||
        state.status === "outingCallingAccept"
      ) {
        setupUpdateCallTimeTask();
      } else if (state.status === "end") {
        clearCallTimeTask();
      }
    }
  );

  const handleCurrentAgentChange = (e: ChangeEvent<string>) => {
    setCurrentAgentId(e.target.value);
  };

  const updateDevice = async (currentAgentId: string) => {
    handleUpdateDeviceState({ status: "initializing" });
    const tokenResponse = await getTwilioToken(dataProvider, currentAgentId);

    if (tokenResponse && tokenResponse.data && tokenResponse.data.token) {
      if (deviceManager.current) {
        deviceManager.current.clear();
      }
      deviceManager.current = new DeviceManager({
        token: tokenResponse.data.token,
        identity: tokenResponse.data.identity,
        updateState: handleUpdateDeviceState,
      });
      deviceManager.current.catch((e: any) => {
        log("Device error", e);
      });
      deviceManager.current.tokenGetter = async () => {
        const data = await getTwilioToken(dataProvider, currentAgentId);
        return data.token;
      };
      return deviceManager.current;
    }
  };

  const handleTabChange = (e: any, newValue: any) => {
    setTab(newValue);
  };

  return {
    tab,
    agentList,
    isAgentLoading,
    deviceState,
    currentAgentId,
    currentAgentObject: useGetCurrentAgentObject(currentAgentId, agentList),
    deviceManager: deviceManager.current,
    handleCurrentAgentChange,
    updateDevice,
    handleTabChange,
    clearCallTimeTask,
  };
};

const getTwilioToken = async (dataProvider: DataProvider, agentId: string) => {
  const res = await dataProvider.httpGet("twilioToken", { agentId });
  return res;
};

const useGetCurrentAgentObject = (currentAgent: string, agentList: any[]) => {
  return useMemo(() => {
    if (agentList.length) {
      return agentList.find((item) => item.id === currentAgent) || {};
    }
    return {};
  }, [currentAgent, agentList.length]);
};
