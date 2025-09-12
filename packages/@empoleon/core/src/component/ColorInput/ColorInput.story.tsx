import { JSX } from 'solid-js';
import { ColorInput } from './ColorInput';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'ColorInput',
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
      <ColorInput
        wrapperProps={{ 'data-test': 'hello' }}
        size="xl"
        // popoverProps={{ opened: true }}
      />
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <ColorInput unstyled label="Unstyled" />
    </div>
  );
}
