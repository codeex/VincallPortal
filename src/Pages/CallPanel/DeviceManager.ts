import { Device, Call } from "@twilio/voice-sdk";
import { log } from "../../Helpers/Index";
import { CallEventName, DeviceEventName, DeviceState } from "./types";

export interface DeviceManagerProps {
  token: string;
  updateState: (state: Partial<DeviceState>) => void;
}

export class DeviceManager {
  token: string;
  updateState: (state: Partial<DeviceState>) => void;
  device: Device;
  call?: Call;
  onError: (error: any) => void;
  constructor({ token, updateState }: DeviceManagerProps) {
    this.token = token;
    this.updateState = updateState;
    this.onError = () => {};
    this.device = this.createDevice(token);
    this.setup(this.device, updateState);
  }
  catch(handler: (error: any) => void) {
    this.onError = handler;
  }

  public async makeOutgoingCall(to: string) {
    if (!to) {
      return;
    }
    if (!this.device || this.device.state !== Device.State.Registered) {
      return;
    }
    const params = {
      To: to,
    };
    const call = await this.device.connect({ params });
    const updateState = this.updateState;
    this.call = call;

    updateState({ status: "outingCalling", to });
    call.on(CallEventName.Accept, () => {
      updateState({
        status: "outingCallingAccept",
        to,
      });
    });

    call.on(CallEventName.Cancel, () => {
      updateState({ status: "end" });
      this.clearCall();
    });

    call.on(CallEventName.Disconnect, () => {
      updateState({ status: "end" });
      this.clearCall();
    });

    call.on(CallEventName.Reject, () => {
      updateState({ status: "outingCallingReject" });
    });

    call.on(CallEventName.Mute, (isMuted: boolean) => {
      updateState({ isMuted });
    });
  }

  public disconnectCall() {
    if (this.call) {
      this.call.disconnect();
    }
  }

  public acceptIncoming() {
    if (this.call) {
      this.call.accept();
    }
  }

  public rejectIncoming() {
    if (this.call) {
      this.call.reject();
    }
  }

  public toggleMute() {
    if (this.call) {
      this.call.mute(!this.call.isMuted);
    }
  }

  private clearCall() {
    if (this.call) {
      this.call.removeAllListeners();
      this.call = null as any;
    }
  }

  private setup(
    device: Device,
    updateState: (state: Partial<DeviceState>) => void
  ) {
    device.on(DeviceEventName.Registered, () => {
      updateState({ status: "ready" });
    });
    device.on(DeviceEventName.Error, (error, call) => {
      log("Ray:An error has occurred: ", error);
      this.onError(error);
    });

    device.on(DeviceEventName.Incoming, (call) => {
      log("Incoming call from", call);
      this.call = call;
      updateState({ status: "incoming", from: call.parameters.From });

      call.on(CallEventName.Accept, () => {
        updateState({ status: "incomingAccept", from: call.parameters.From });
      });

      call.on(CallEventName.Cancel, () => {
        updateState({ status: "end" });
        this.clearCall();
      });

      call.on(CallEventName.Disconnect, () => {
        updateState({ status: "end" });
        this.clearCall();
      });

      call.on(CallEventName.Reject, () => {
        updateState({ status: "incomingReject" });
      });

      call.on(CallEventName.Mute, (isMuted: boolean) => {
        updateState({ isMuted });
      });
    });

    device.on(DeviceEventName.TokenWillExpire, () => {
      device.updateToken("" /** TODO: newToken */);
    });

    // TODO: TEST:
    setTimeout(() => {
      log("Ray:TEST");
      updateState({ status: "ready" });
    }, 0);
  }

  private createDevice(token: string) {
    return new Device(token, {
      appName: "VinCall",
      appVersion: "1.0.0",
    });
  }
}
