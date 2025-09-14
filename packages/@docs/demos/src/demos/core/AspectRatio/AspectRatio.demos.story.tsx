import { JSX } from 'solid-js';
import { renderDemo } from '../../../render-demo';
import * as demos from './index';
import { EmpoleonProvider } from '@empoleon/core';

export default {
  title: 'AspectRatio',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ]
};

export const Demo_image = {
  name: '⭐ Demo: image',
  render: renderDemo(demos.image),
};

export const Demo_map = {
  name: '⭐ Demo: map',
  render: renderDemo(demos.map),
};

export const Demo_video = {
  name: '⭐ Demo: video',
  render: renderDemo(demos.video),
};

export const Demo_flex = {
  name: '⭐ Demo: flex',
  render: renderDemo(demos.flex),
};
