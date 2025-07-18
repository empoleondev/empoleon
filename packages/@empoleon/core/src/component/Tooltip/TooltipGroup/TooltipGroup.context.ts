import { createContext, useContext } from "solid-js";

const TooltipGroupContext = createContext(false);

export const TooltipGroupProvider = TooltipGroupContext.Provider;
export const useTooltipGroupContext = () => useContext(TooltipGroupContext);
