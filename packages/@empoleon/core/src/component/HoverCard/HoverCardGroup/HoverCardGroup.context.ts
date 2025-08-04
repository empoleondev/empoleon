import { createContext, useContext } from 'solid-js';

const HoverCardGroupContext = createContext(false);

export const HoverCardGroupProvider = HoverCardGroupContext.Provider;
export const useHoverCardGroupContext = () => useContext(HoverCardGroupContext);
