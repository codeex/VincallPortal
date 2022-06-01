import { RuntimeInterface } from "./index";

const noop = () => {};

export const defaultRuntime = {
  eventHandler: {},
  init: noop,
  sendNotify: noop,
  updateAgentStatus: noop,
  on: function () {
    return this as RuntimeInterface;
  },
} as RuntimeInterface;
