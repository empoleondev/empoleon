import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { SemiCircleProgress } from './SemiCircleProgress';

export default {
  title: 'SemiCircleProgress',
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
      <SemiCircleProgress value={40} label="40%" labelPosition="bottom" />
    </div>
  );
}
