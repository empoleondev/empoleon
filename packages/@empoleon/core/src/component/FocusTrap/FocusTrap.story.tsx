import { JSX } from 'solid-js';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonProvider } from '../../core';
import { FocusTrap } from './FocusTrap';

export default {
  title: 'FocusTrap',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  const [active, handlers] = useDisclosure(false);
  return (
    <>
      <button type="button" onClick={handlers.toggle}>
        Toggle
      </button>
      <FocusTrap active={active()}>
        {(focusTrapProps) => (
          <div {...focusTrapProps}>
            <input />
            <input />
            <input />
          </div>
        )}
      </FocusTrap>
    </>
  );
}
