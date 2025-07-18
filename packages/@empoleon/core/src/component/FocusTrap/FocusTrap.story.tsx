import { useDisclosure } from '@empoleon/hooks';
import { FocusTrap } from './FocusTrap';
import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';

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
