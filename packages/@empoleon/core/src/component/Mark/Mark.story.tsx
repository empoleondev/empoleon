import { JSX } from 'solid-js';
import { Mark } from './Mark';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Mark',
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
      <div>
        <Mark>Default mark</Mark>
      </div>
      <div>
        <Mark color="orange.9">Theme color mark</Mark>
      </div>
      <div>
        <Mark color="#f0ff00">CSS color mark</Mark>
      </div>
    </div>
  );
}
