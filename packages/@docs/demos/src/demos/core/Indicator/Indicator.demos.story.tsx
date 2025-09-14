import { JSX } from 'solid-js';
import { renderDemo } from '../../../render-demo';
import * as demos from './index';
import { EmpoleonProvider } from '@empoleon/core';

export default {
  title: 'Indicator',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ]
};

export const Demo_configurator = {
  name: '⭐ Demo: configurator',
  render: renderDemo(demos.configurator),
};

export const Demo_inline = {
  name: '⭐ Demo: inline',
  render: renderDemo(demos.inline),
};

export const Demo_offset = {
  name: '⭐ Demo: offset',
  render: renderDemo(demos.offset),
};

export const Demo_processing = {
  name: '⭐ Demo: processing',
  render: renderDemo(demos.processing),
};

export const Demo_disabled = {
  name: '⭐ Demo: disabled',
  render: renderDemo(demos.disabled),
};
