import { createContext } from "solid-js";

export interface TransitionGroupContextValue {
  isMounting: boolean;
}

export const TransitionGroupContext = createContext<TransitionGroupContextValue>({
  isMounting: false,
});
