import { JSX } from 'solid-js';
import { renderDemo } from '../../../render-demo';
import * as demos from './index';
import { EmpoleonProvider } from '@empoleon/core';

export default {
  title: 'Transition',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ]
};

export const Demo_custom = {
  name: '⭐ Demo: custom',
  render: renderDemo(demos.custom),
};

export const Demo_delay = {
  name: '⭐ Demo: delay',
  render: renderDemo(demos.delay),
};
