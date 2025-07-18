import { createOptionalContext, EmpoleonSize } from '../../core';

interface RadioGroupContextValue {
  size: EmpoleonSize | undefined;
  value: string;
  onChange: (event: Event | string) => void;
  name: string;
}

export const [RadioGroupProvider, useRadioGroupContext] =
  createOptionalContext<RadioGroupContextValue>();
