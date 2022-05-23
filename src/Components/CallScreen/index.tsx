import { useState } from "react";
import { DeviceManager } from "../../Pages/CallPanel/DeviceManager";
import { DeviceState } from "../../Pages/CallPanel/types";
import { ChangeEvent } from "../../types";
import { CallingScreen } from "./CallingScreen";
import { NumberScreen } from "./NumberScreen";

export interface CallScreenProps {
  agentName?: string;
  deviceManager: DeviceManager;
  deviceState: DeviceState;
}

export const CallScreen = ({ agentName, deviceState }: CallScreenProps) => {
  const [number, setNumber] = useState<string>("");

  const handleNumberChange = (e: ChangeEvent) => {
    setNumber(e.target.value);
  };
  const handleCall = () => {};
  const handleCallEnd = () => {
    setNumber("");
  };

  if (deviceState.status === "ready" || deviceState.status === "end") {
    return (
      <NumberScreen
        value={number}
        onChange={handleNumberChange}
        onCall={handleCall}
      />
    );
  }
  return (
    <CallingScreen
      deviceState={deviceState}
      onEnd={handleCallEnd}
      onToggleMute={(isMute: boolean) => {}}
    />
  );
};
