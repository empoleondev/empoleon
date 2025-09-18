import { JSX, createEffect } from 'solid-js';
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
  title: 'Grid',
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
  ],
};
export const Demo_usage = {
  name: '⭐ Demo: usage',
  render: renderDemo(demos.usage),
};

export const Demo_growConfigurator = {
  name: '⭐ Demo: growConfigurator',
  render: renderDemo(demos.growConfigurator),
};

export const Demo_offset = {
  name: '⭐ Demo: offset',
  render: renderDemo(demos.offset),
};

export const Demo_order = {
  name: '⭐ Demo: order',
  render: renderDemo(demos.order),
};

export const Demo_rows = {
  name: '⭐ Demo: rows',
  render: renderDemo(demos.rows),
};

export const Demo_flexConfigurator = {
  name: '⭐ Demo: flexConfigurator',
  render: renderDemo(demos.flexConfigurator),
};

export const Demo_responsive = {
  name: '⭐ Demo: responsive',
  render: renderDemo(demos.responsive),
};

export const Demo_columns = {
  name: '⭐ Demo: columns',
  render: renderDemo(demos.columns),
};

export const Demo_auto = {
  name: '⭐ Demo: auto',
  render: renderDemo(demos.auto),
};

export const Demo_content = {
  name: '⭐ Demo: content',
  render: renderDemo(demos.content),
};

export const Demo_gutter = {
  name: '⭐ Demo: gutter',
  render: renderDemo(demos.gutter),
};

export const Demo_container = {
  name: '⭐ Demo: container',
  render: renderDemo(demos.container),
};
