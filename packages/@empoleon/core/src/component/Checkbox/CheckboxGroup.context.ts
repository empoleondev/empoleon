import { Accessor, createContext, useContext } from 'solid-js';
import { EmpoleonSize } from '../../core';

interface CheckboxGroupContextValue {
  value: Accessor<string[]>;
  onChange: (value: Event | string) => void;
  size: Accessor<EmpoleonSize | (string & {}) | undefined>;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | undefined>(undefined);
export const CheckboxGroupProvider = CheckboxGroupContext.Provider;
export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext)!;
