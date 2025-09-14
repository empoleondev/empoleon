import { JSX } from 'solid-js';
import { renderDemo } from '../../../render-demo';
import * as demos from './index';
import { EmpoleonProvider } from '@empoleon/core';

export default {
  title: 'Calendar',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ]
};

export const Demo_usage = {
  name: '⭐ Demo: usage',
  render: renderDemo(demos.usage),
};

export const Demo_isStatic = {
  name: '⭐ Demo: isStatic',
  render: renderDemo(demos.isStatic),
};

export const Demo_picker = {
  name: '⭐ Demo: picker',
  render: renderDemo(demos.picker),
};

export const Demo_weekPicker = {
  name: '⭐ Demo: weekPicker',
  render: renderDemo(demos.weekPicker),
};
