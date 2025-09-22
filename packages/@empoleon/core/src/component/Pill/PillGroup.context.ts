import { Accessor } from 'solid-js';
import { createOptionalContext, EmpoleonSize } from '../../core';

export interface PillGroupContextValue {
  size: Accessor<EmpoleonSize | (string & {}) | undefined>;
  disabled: boolean | undefined;
}

export const [PillGroupProvider, usePillGroupContext] =
  createOptionalContext<PillGroupContextValue>();
