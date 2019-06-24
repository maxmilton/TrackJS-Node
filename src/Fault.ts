import { transmit } from "./Transmitter";
import { AgentRegistrar } from "./AgentRegistrar";
import { serialize } from "./utils/serialize";
import { isError } from "./utils/isType";
import { Agent } from "./Agent";

export function captureFault(fault: any) {
  let error = isError(fault) ? fault : new Error(serialize(fault));
  let agent = AgentRegistrar.getCurrentAgent();
  let agentOptions = agent ? agent.options : Agent.defaults;

  transmit({
    url: agentOptions.faultUrl,
    method: "GET",
    queryParams: {
      token: agentOptions.token,
      file: "",
      msg: error.message,
      stack: (error.stack || "").substr(0, 1000),
      url: "",
      v: "TODO",
      h: "TODO"
    }
  });
}
