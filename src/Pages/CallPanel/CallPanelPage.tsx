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

export const CallPanelPage = () => {
  const {
    deviceState,
    currentAgent,
    agentList,
    isAgentLoading,
    deviceManager,
    handleCurrentAgentChange,
    updateDevice,
  } = callPanelPageApp();

  useEffect(() => {
    if (currentAgent) {
      updateDevice(currentAgent);
    }
  }, [currentAgent]);
  return (
    <Card>
      <Title title="Agent Console" />
      <Paper>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={0} aria-label="choose an agent">
            <Tab label="Agent Console" />
          </Tabs>
        </Box>
        <CTabPanel value={0} index={0}>
          <Box>
            <TextField
              label="Current Agent"
              select
              value={currentAgent}
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
                currentAgent={currentAgent}
                deviceManager={deviceManager!}
                deviceState={deviceState}
              />
            </Box>
          )}
        </CTabPanel>
      </Paper>
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
