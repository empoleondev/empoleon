import { JSX } from 'solid-js';
import { renderDemo } from '../../../render-demo';
import * as demos from './index';
import { EmpoleonProvider } from '@empoleon/core';

export default {
  title: 'ColorSwatch',
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

export const Demo_component = {
  name: '⭐ Demo: component',
  render: renderDemo(demos.component),
};

export const Demo_shadow = {
  name: '⭐ Demo: shadow',
  render: renderDemo(demos.shadow),
};
