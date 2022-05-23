import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { NumberButton } from "./NumberButton";
import MicOffIcon from "@mui/icons-material/MicOff";
import AppsIcon from "@mui/icons-material/Apps";
import PauseIcon from "@mui/icons-material/Pause";
import CallIcon from "@mui/icons-material/Call";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DeviceState } from "../../Pages/CallPanel/types";

export interface CallingScreenProps {
  deviceState: DeviceState;
  onEnd: () => void;
  onToggleMute: (isMute: boolean) => void;
}

export const CallingScreen = ({
  deviceState,
  onEnd,
  onToggleMute,
}: CallingScreenProps) => {
  const handleActionClick = (actionType?: string | number) => {
    switch (actionType) {
      case "nute":
        // onToggleMute();
        break;
      case "keypad":
        break;
      case "speaker":
        break;
      case "hold":
        break;
      default:
        return;
    }
  };

  return (
    <Paper sx={{ width: 240, height: 486, padding: 4 }} elevation={1}>
      <Box sx={{ textAlign: "center" }}>
        <AccountCircleIcon sx={{ fontSize: 72, margin: "0 atuo" }} />
      </Box>

      <div style={{ textAlign: "center" }}>
        <ContactInfo deviceState={deviceState} />
      </div>

      <Grid container>
        {actionItems.map((action, index) => {
          const Icon = action.icon;
          return (
            <Grid item xs={4} key={index} sx={{ padding: 1 }}>
              <NumberButton character={action.name} onClick={handleActionClick}>
                <Icon />
              </NumberButton>
            </Grid>
          );
        })}
        {(deviceState.status === "outingCalling" ||
          deviceState.status === "outingCallingAccept" ||
          deviceState.status === "incomingAccept") && (
          <Grid
            item
            xs={12}
            key="cancelCall"
            sx={{ display: "flex", justifyContent: "center", padding: 1 }}
          >
            <NumberButton character="cancelCall" onClick={handleActionClick}>
              <CallIcon sx={{ transform: "rotate(135deg)" }} />
            </NumberButton>
          </Grid>
        )}
        {deviceState.status === "incoming" && (
          <>
            <Grid
              item
              xs={6}
              key="acceptCall"
              sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}
            >
              <NumberButton character="acceptCall" onClick={handleActionClick}>
                <CallIcon />
              </NumberButton>
            </Grid>
            <Grid
              item
              xs={6}
              key="cancelCall"
              sx={{ display: "flex", justifyContent: "start", padding: 1 }}
            >
              <NumberButton character="cancelCall" onClick={handleActionClick}>
                <CallIcon sx={{ transform: "rotate(135deg)" }} />
              </NumberButton>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
};

const ContactInfo = ({ deviceState }: { deviceState: DeviceState }) => {
  if (deviceState.status === "outingCalling") {
    return (
      <>
        <div>Calling... </div>
        <div>To: {deviceState.to}</div>
      </>
    );
  }
  if (deviceState.status === "outingCallingAccept") {
    return (
      <>
        <div>Connected... </div>
        <div>To: {deviceState.to}</div>
      </>
    );
  }

  if (deviceState.status === "incoming") {
    return (
      <>
        <div>Incoming... </div>
        <div>From: {deviceState.from}</div>
      </>
    );
  }

  if (deviceState.status === "incomingAccept") {
    return (
      <>
        <div>Connected... </div>
        <div>From: {deviceState.from}</div>
      </>
    );
  }
  return null;
};

interface ActionItem {
  name: string;
  label: string;
  icon: React.ComponentFactory<any, any>;
}

const actionItems: ActionItem[] = [
  { name: "nute", label: "Mute", icon: MicOffIcon },
  { name: "keypad", label: "Keypad", icon: AppsIcon },
  { name: "speaker", label: "Speaker", icon: () => null as any },
  { name: "hold", label: "Hold", icon: PauseIcon },
  { name: "placeholder", label: "", icon: () => null as any },
  { name: "placeholder", label: "", icon: () => null as any },
];
