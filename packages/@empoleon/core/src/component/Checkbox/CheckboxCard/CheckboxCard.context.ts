import { Accessor } from 'solid-js';
import { createOptionalContext } from '../../../core';

export interface CheckboxCardContextValue {
  checked: Accessor<boolean>;
}

export const [CheckboxCardProvider, useCheckboxCardContext] =
  createOptionalContext<CheckboxCardContextValue>();
