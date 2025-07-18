import { JSX } from 'solid-js';
import { Divider } from './Divider';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Divider',
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
      <div>First</div>
      <Divider label="Divider label" labelPosition="right" />
      <div>Second</div>
    </div>
  );
}
