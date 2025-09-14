import { JSX } from 'solid-js';
import { renderDemo } from '../../../render-demo';
import * as demos from './index';
import { EmpoleonProvider } from '@empoleon/core';

export default {
  title: 'FloatingIndicator',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ]
};

export const Demo_direction = {
  name: '⭐ Demo: direction',
  render: renderDemo(demos.direction),
};

export const Demo_segmented = {
  name: '⭐ Demo: segmented',
  render: renderDemo(demos.segmented),
};

export const Demo_tabs = {
  name: '⭐ Demo: tabs',
  render: renderDemo(demos.tabs),
};
