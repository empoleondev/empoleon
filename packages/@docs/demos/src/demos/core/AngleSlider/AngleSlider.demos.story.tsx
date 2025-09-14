import { JSX } from 'solid-js';
import { renderDemo } from '../../../render-demo';
import * as demos from './index';
import { EmpoleonProvider } from '@empoleon/core';

export default {
  title: 'AngleSlider',
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

export const Demo_marks = {
  name: '⭐ Demo: marks',
  render: renderDemo(demos.marks),
};

export const Demo_formatLabel = {
  name: '⭐ Demo: formatLabel',
  render: renderDemo(demos.formatLabel),
};

export const Demo_onChangeEnd = {
  name: '⭐ Demo: onChangeEnd',
  render: renderDemo(demos.onChangeEnd),
};

export const Demo_disabled = {
  name: '⭐ Demo: disabled',
  render: renderDemo(demos.disabled),
};
