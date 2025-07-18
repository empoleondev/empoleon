import { createOptionalContext, EmpoleonSize } from '../../core';

interface InputContext {
  size: EmpoleonSize | (string & {});
}

export const [InputContext, useInputContext] = createOptionalContext<InputContext>({
  size: 'sm',
});
