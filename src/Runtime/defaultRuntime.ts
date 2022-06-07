import { APPAPI } from "@comm100/app-client/type";
import { checkIfAgentFree } from "./comm100Runtime";
import { RuntimeInterface } from "./index";

const getAppClient = (): APPAPI => {
  // @ts-ignore
  return window.__comm100_client;
};

const noop = () => {};

export const defaultRuntime = {
  eventHandler: {},
  on(eventName: "busy" | "free", callback: () => void) {
    this.eventHandler[eventName] = callback;
    return this;
  },
  init() {
    const client = getAppClient();
    if (!client) {
      return;
    }
    client.on("agentconsole.navBar.select", (leftTab) => {
      console.log("Ray: agentconsole.navBar.select", leftTab);
    });

    client.on("agentconsole.chats.chatStarted", (args: any) => {
      console.log("Ray: chatStarted", args.chat);
      if (this.eventHandler.busy) {
        this.eventHandler.busy();
      }
    });

    client.on("agentconsole.chats.chatEnded", (args: any) => {
      console.log("Ray: chatEnded", args.chat);
      checkIfAgentFree(client, this);
    });
  },
  sendNotify: noop,
  updateAgentStatus(status: "online" | "away") {
    const client = getAppClient();
    if (!client) {
      return;
    }
    client.set("currentAgent.status", status);
  },
} as RuntimeInterface;
