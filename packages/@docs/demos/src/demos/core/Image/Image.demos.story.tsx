import { JSX } from 'solid-js';
import { renderDemo } from '../../../render-demo';
import * as demos from './index';
import { EmpoleonProvider } from '@empoleon/core';

export default {
  title: 'Image',
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

export const Demo_height = {
  name: '⭐ Demo: height',
  render: renderDemo(demos.height),
};

export const Demo_contain = {
  name: '⭐ Demo: contain',
  render: renderDemo(demos.contain),
};

export const Demo_fallback = {
  name: '⭐ Demo: fallback',
  render: renderDemo(demos.fallback),
};
