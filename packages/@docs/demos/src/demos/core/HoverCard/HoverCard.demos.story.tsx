import { JSX } from 'solid-js';
import { renderDemo } from '../../../render-demo';
import * as demos from './index';
import { EmpoleonProvider } from '@empoleon/core';

export default {
  title: 'HoverCard',
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

export const Demo_profile = {
  name: '⭐ Demo: profile',
  render: renderDemo(demos.profile),
};

export const Demo_delay = {
  name: '⭐ Demo: delay',
  render: renderDemo(demos.delay),
};

export const Demo_group = {
  name: '⭐ Demo: group',
  render: renderDemo(demos.group),
};
