import {
  Card,
  Paper,
  Box,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Title } from "react-admin";
import { CTabPanel } from "../../Components/Tabs/CTabPanel";
import { callPanelPageApp } from "./CallPanelPageApp";
import { CallScreen } from "../../Components/CallScreen";
import { useEffect } from "react";
import { AgentConsolePanel } from "./AgentConsolePanel";

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
  } = callPanelPageApp();

  useEffect(() => {
    if (currentAgentId) {
      updateDevice(currentAgentId);
    }
  }, [currentAgentId]);
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
        <Box>
          <TextField
            label="Current Agent"
            select
            value={currentAgentId}
            placeholder="Select an Agent"
            onChange={handleCurrentAgentChange}
            style={{ width: 200 }}
            variant="standard"
            disabled={!getIfCanChangeAgentWhenCalling()}
          >
            {isAgentLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              agentList.map(({ id, deviceNumber, userAccount }) => (
                <MenuItem key={id} value={id}>
                  {userAccount} {deviceNumber}
                </MenuItem>
              ))
            )}
          </TextField>
        </Box>
        {deviceState.status === "initializing" ? (
          <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ pt: 2 }}>
            <CallScreen
              currentAgent={currentAgentId}
              currentAgentNumber={currentAgentObject.deviceNumber}
              deviceManager={deviceManager!}
              deviceState={deviceState}
            />
          </Box>
        )}
      </CTabPanel>
      <CTabPanel value={tab} index={1}>
        {tab === 1 && <AgentConsolePanel />}
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

const getIfCanChangeAgentWhenCalling = () => {
  return true;
};
