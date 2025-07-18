import { JSX } from 'solid-js';
import { ActionIcon } from '../ActionIcon';
import { VisuallyHidden } from './VisuallyHidden';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'VisuallyHidden',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <ActionIcon>
        <VisuallyHidden>Pronounce this</VisuallyHidden>
        $$
      </ActionIcon>
    </div>
  );
}
