import { JSX } from 'solid-js';
import { TimeValue } from './TimeValue';
import { EmpoleonProvider } from '@empoleon/core';

export default {
  title: 'TimeValue',
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
      <TimeValue value="12:30" withSeconds />
    </div>
  );
}
