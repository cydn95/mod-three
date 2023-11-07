import { ModThreeMachine } from "./ModThreeMachine";

export function modThree(input: string): number {
  const mtm = new ModThreeMachine();

  return mtm.run(input);
}
