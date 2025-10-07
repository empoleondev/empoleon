import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { Kbd } from './Kbd';

export default {
  title: 'Kbd',
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
    <div style={{ padding: '40px' }}>
      <Kbd size={30}>Shift</Kbd>
    </div>
  );
}
