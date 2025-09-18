import { createEffect, JSX } from 'solid-js';
import { renderDemo } from '../../../render-demo';
import * as demos from './index';
import { EmpoleonProvider, useEmpoleonColorScheme } from '@empoleon/core';
import { createShikiAdapter } from '@empoleon/code-highlight';
import { CodeHighlightAdapterProvider } from '@empoleon/code-highlight';

const shikiAdapter = createShikiAdapter();

function ColorSchemeWrapper(props: { children: JSX.Element; globals: any }) {
  const { setColorScheme } = useEmpoleonColorScheme();

  createEffect(() => {
    const theme = props.globals?.theme || 'light';
    setColorScheme(theme);
  });

  return <>{props.children}</>;
}

export default {
  title: 'AspectRatio',
  decorators: [
    (Story: () => JSX.Element, context: any) => (
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        <EmpoleonProvider>
          <ColorSchemeWrapper globals={context.globals}>
            <Story />
          </ColorSchemeWrapper>
        </EmpoleonProvider>
      </CodeHighlightAdapterProvider>
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
