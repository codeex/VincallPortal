import { useMemo, useRef, useState } from "react";
import {
  DataProvider,
  useDataProvider,
  useGetList,
  useGetOne,
} from "react-admin";
import { log } from "../../Helpers/Index";
import { ChangeEvent } from "../../types";
import { AgentBo } from "./CallPanelPage";
import { DeviceManager } from "./DeviceManager";
import { DeviceState } from "./types";

export const callPanelPageApp = () => {
  const [currentAgentId, setCurrentAgentId] = useState<string>("");
  const dataProvider = useDataProvider();
  const deviceManager = useRef<DeviceManager>();

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

  const handleUpdateDeviceState = (
    state: Partial<DeviceState>,
    shouldUseAssign?: boolean
  ) => {
    if (shouldUseAssign) {
      setDeviceState(Object.assign({}, deviceState, state));
    } else {
      setDeviceState(state as any);
    }
  };

  const handleCurrentAgentChange: any = (e: ChangeEvent<string>) => {
    setCurrentAgentId(e.target.value);
  };

  const updateDevice = async (currentAgentId: string) => {
    handleUpdateDeviceState({ status: "initializing" });
    const tokenResponse = await getTwilioToken(dataProvider, currentAgentId);
    if (tokenResponse.token) {
      if (deviceManager.current) {
        deviceManager.current.clear();
      }
      deviceManager.current = new DeviceManager({
        token: tokenResponse.token,
        identity: tokenResponse.identity,
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

  return {
    agentList,
    isAgentLoading,
    deviceState,
    currentAgentId,
    currentAgentObject: useGetCurrentAgentObject(currentAgentId, agentList),
    deviceManager: deviceManager.current,
    handleCurrentAgentChange,
    updateDevice,
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
