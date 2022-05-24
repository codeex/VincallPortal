import { useState } from "react";
import { DeviceManager } from "../../Pages/CallPanel/DeviceManager";
import { DeviceState } from "../../Pages/CallPanel/types";
import { ChangeEvent } from "../../types";
import { CallingScreen } from "./CallingScreen";
import { NumberScreen } from "./NumberScreen";

export interface CallScreenProps {
  currentAgent?: string;
  currentAgentNumber?: string;
  deviceManager: DeviceManager;
  deviceState: DeviceState;
}

export const CallScreen = ({
  currentAgent,
  currentAgentNumber,
  deviceState,
  deviceManager,
}: CallScreenProps) => {
  const [number, setNumber] = useState<string>("");

  const handleNumberChange = (e: ChangeEvent) => {
    setNumber(e.target.value);
  };
  const handleCall = () => {
    deviceManager.makeOutgoingCall(number);
  };
  const handleCallEnd = () => {
    setNumber("");
    deviceManager.disconnectCall();
  };
  const handleAcceptIncoming = () => {
    deviceManager.acceptIncoming();
  };

  const handleRejectIncoming = () => {
    deviceManager.rejectIncoming();
  };

  const handleToggleMute = () => {
    deviceManager.toggleMute();
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
      currentAgentNumber={currentAgentNumber}
      deviceState={deviceState}
      onAcceptIncoming={handleAcceptIncoming}
      onRejectIncoming={handleRejectIncoming}
      onEnd={handleCallEnd}
      onToggleMute={handleToggleMute}
    />
  );
};
