import { useMemo, useRef, useState } from "react";
import {
  DataProvider,
  useDataProvider,
  useGetIdentity,
  useGetList,
} from "react-admin";
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
  const { identity } = useGetIdentity();

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

  const currentAgentObject = useGetCurrentAgentObject(
    currentAgentId,
    agentList
  );

  const requestForUpdateCallTime = () => {
    log("request update call time start.");
    dataProvider.httpGet(`agent/${currentAgentId}/updatetime`);
  };

  const requestForUpdateStatusToOnline = () => {
    dataProvider.httpGet(`agent/${currentAgentId}/updateStatusToOnline`);
  };

  const setupUpdateCallTimeTask = () => {
    if (updateCallTimeTaskId.current) {
      clearInterval(updateCallTimeTaskId.current);
    }
    updateCallTimeTaskId.current = setInterval(requestForUpdateCallTime, 5000);
  };

  const clearCallTimeTask = () => {
    log("request for update call time end.");
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

      if (state.status === "ready") {
        if (currentAgentObject && identity) {
          if (currentAgentObject.userAccount === identity.account) {
            setupUpdateCallTimeTask();
          } else {
            clearCallTimeTask();
          }
        }
      }
      if (state.status === "end") {
        requestForUpdateStatusToOnline();
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
    currentAgentObject,
    deviceManager: deviceManager.current,
    handleCurrentAgentChange,
    updateDevice,
    handleTabChange,
    setupUpdateCallTimeTask,
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
