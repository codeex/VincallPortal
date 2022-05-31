import { Card, Box, Tabs, Tab } from "@mui/material";
import { Title, useGetIdentity } from "react-admin";
import { CTabPanel } from "../../Components/Tabs/CTabPanel";
import { callPanelPageApp } from "./CallPanelPageApp";
import { useEffect } from "react";
import { AgentConsolePanel } from "./AgentConsolePanel";
import { CallTabContent } from "./CallTabContent";
import { isEmbeddedMode, log } from "../../Helpers/Index";

export const CallPanelPage = () => {
  const {
    tab,
    deviceState,
    currentAgentId,
    currentAgentObject,
    agentList,
    isAgentLoading,
    deviceManager,
    handleCurrentAgentChange,
    updateDevice,
    handleTabChange,
    clearCallTimeTask,
  } = callPanelPageApp();

  const { identity } = useGetIdentity();
  useEffect(() => {
    if (currentAgentId) {
      updateDevice(currentAgentId);
    }
  }, [currentAgentId]);

  useEffect(() => {
    if (!!agentList.length && identity?.account) {
      const currentAgent = agentList.find(
        (item) => item.userAccount === identity?.account
      ) || { id: "" };
      handleCurrentAgentChange({
        target: { value: (currentAgent.id as any) || (agentList[0].id as any) },
      });
    }
  }, [!!agentList.length, identity?.account]);
  useEffect(() => {
    return () => {
      clearCallTimeTask();
      if (deviceManager) {
        deviceManager.clear();
      }
    };
  }, []);
  if (isEmbeddedMode) {
    return (
      <Card sx={{ p: 3, mt: 3 }}>
        <Title title="Call Panel" />
        <CallTabContent
          isAgentLoading={isAgentLoading}
          currentAgentId={currentAgentId}
          currentAgentObject={currentAgentObject}
          agentList={agentList}
          deviceState={deviceState}
          deviceManager={deviceManager}
          handleCurrentAgentChange={handleCurrentAgentChange}
        />
      </Card>
    );
  }
  return (
    <Card sx={{ p: 3, mt: 3 }}>
      <Title title="Call Panel" />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Call Panel" />
          <Tab label="Comm100 agent console" />
        </Tabs>
      </Box>
      <CTabPanel value={tab} index={0}>
        <CallTabContent
          isAgentLoading={isAgentLoading}
          currentAgentId={currentAgentId}
          currentAgentObject={currentAgentObject}
          agentList={agentList}
          deviceState={deviceState}
          deviceManager={deviceManager}
          handleCurrentAgentChange={handleCurrentAgentChange}
        />
      </CTabPanel>
      <CTabPanel value={tab} index={1}>
        <AgentConsolePanel />
      </CTabPanel>
    </Card>
  );
};

export interface AgentBo {
  id: number;
  deviceNumber: string;
  userAccount: string;
  remark: string;
  state: number;
  createDate: string;
}
