import { JSX } from 'solid-js';
import { Stack } from './Stack';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Stack',
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
      <Stack>
        <button type="button">First</button>
        <button type="button">Second</button>
        <button type="button">Third</button>
      </Stack>
    </div>
  );
}
