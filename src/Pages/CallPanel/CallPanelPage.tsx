import { Card, Box, Tabs, Tab } from "@mui/material";
import { Title } from "react-admin";
import { CTabPanel } from "../../Components/Tabs/CTabPanel";
import { callPanelPageApp } from "./CallPanelPageApp";
import { useEffect } from "react";
import { AgentConsolePanel } from "./AgentConsolePanel";
import { CallTabContent } from "./CallTabContent";
import { isEmbeddedMode } from "../../Helpers/Index";

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

  useEffect(() => {
    if (currentAgentId) {
      updateDevice(currentAgentId);
    }
  }, [currentAgentId]);

  useEffect(() => {
    if (!!agentList.length) {
      handleCurrentAgentChange({
        target: { value: agentList[0].id as any },
      });
    }
  }, [!!agentList.length]);
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
        <Title title="Agent Console" />
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
      <Title title="Agent Console" />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Agent Console" />
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
