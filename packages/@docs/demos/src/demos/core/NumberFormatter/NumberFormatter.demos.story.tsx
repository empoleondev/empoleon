import { JSX } from 'solid-js';
import { renderDemo } from '../../../render-demo';
import * as demos from './index';
import { EmpoleonProvider } from '@empoleon/core';

export default {
  title: 'NumberFormatter',
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

export const Demo_prefixSuffix = {
  name: '⭐ Demo: prefixSuffix',
  render: renderDemo(demos.prefixSuffix),
};

export const Demo_thousandsSeparator = {
  name: '⭐ Demo: thousandsSeparator',
  render: renderDemo(demos.thousandsSeparator),
};

export const Demo_decimalScale = {
  name: '⭐ Demo: decimalScale',
  render: renderDemo(demos.decimalScale),
};
