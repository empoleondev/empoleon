import { JSX } from 'solid-js';
import { renderDemo } from '../../../render-demo';
import * as demos from './index';
import { EmpoleonProvider } from '@empoleon/core';

export default {
  title: 'Card',
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

export const Demo_link = {
  name: '⭐ Demo: link',
  render: renderDemo(demos.link),
};

export const Demo_linkSection = {
  name: '⭐ Demo: linkSection',
  render: renderDemo(demos.linkSection),
};

export const Demo_section = {
  name: '⭐ Demo: section',
  render: renderDemo(demos.section),
};
