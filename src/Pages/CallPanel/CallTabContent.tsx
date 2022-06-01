import { Box, TextField, MenuItem, CircularProgress } from "@mui/material";
import { CallScreen } from "../../Components/CallScreen";
import { DeviceState } from "./types";
import { DeviceManager } from "./DeviceManager";
import { useCheckPermission, PermissionEnums } from "../../Helpers/Permission";

export interface CallTabContentProps {
  isAgentLoading: boolean;
  currentAgentId: string;
  agentList: any[];
  deviceState: DeviceState;
  deviceManager?: DeviceManager;
  currentAgentObject: any;
  handleCurrentAgentChange: (p: any) => any;
}
export const CallTabContent = ({
  isAgentLoading,
  currentAgentId,
  currentAgentObject,
  handleCurrentAgentChange,
  agentList,
  deviceState,
  deviceManager,
}: CallTabContentProps) => {
  const canSelectAgentWhenCall = useCheckPermission(
    PermissionEnums.canSelectAgentWhenCall
  );
  return (
    <>
      <Box>
        <TextField
          label="Current Agent"
          select
          value={currentAgentId}
          placeholder="Select an Agent"
          onChange={handleCurrentAgentChange}
          style={{ width: 200 }}
          variant="standard"
          disabled={!canSelectAgentWhenCall}
        >
          {isAgentLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            agentList.map(({ id, deviceNumber, userAccount }: any) => (
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
    </>
  );
};

const getIfCanChangeAgentWhenCalling = () => {
  return true;
};
