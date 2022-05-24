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
import { useEffect, useRef } from "react";
import { DeviceManager } from "./DeviceManager";
import { log } from "../../Helpers/Index";

export const CallPanelPage = () => {
  const {
    token,
    deviceState,
    currentAgent,
    agentList,
    isAgentLoading,
    handleCurrentAgentChange,
    initDevice,
  } = callPanelPageApp();
  let deviceManager = useRef<DeviceManager>();
  useEffect(() => {
    if (token) {
      deviceManager.current = initDevice(token);
    }
  }, [token]);
  log("Ray:deviceState", deviceState, token);
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
            >
              {isAgentLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={24} />
                </Box>
              ) : (
                agentList.map(({ id, deviceNumber, userAccount }) => (
                  <MenuItem key={deviceNumber} value={deviceNumber}>
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
                deviceManager={deviceManager.current!}
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
