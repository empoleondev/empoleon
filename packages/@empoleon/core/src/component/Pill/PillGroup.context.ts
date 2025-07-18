import { createOptionalContext, EmpoleonSize } from '../../core';

export interface PillGroupContextValue {
  size: EmpoleonSize | (string & {}) | undefined;
  disabled: boolean | undefined;
}

export const [PillGroupProvider, usePillGroupContext] =
  createOptionalContext<PillGroupContextValue>();
