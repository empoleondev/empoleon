import { createContext, useContext } from 'solid-js';
import { EmpoleonSize } from '../../core';

interface SwitchGroupContextValue {
  value: string[];
  onChange: (event: Event) => void;
  size: EmpoleonSize | (string & {}) | undefined;
}

const SwitchGroupContext = createContext<SwitchGroupContextValue | null>(null);
export const SwitchGroupProvider = SwitchGroupContext.Provider;
export const useSwitchGroupContext = () => useContext(SwitchGroupContext);
