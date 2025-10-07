import { createEffect, JSX } from 'solid-js';
import { CodeHighlightAdapterProvider, createShikiAdapter } from '@empoleon/code-highlight';
import { EmpoleonProvider, useEmpoleonColorScheme } from '@empoleon/core';
import { renderDemo } from '../../render-demo';
import * as demos from './index';

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
  title: 'Notifications',
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
export const Demo_autoclose = {
  name: '⭐ Demo: autoclose',
  render: renderDemo(demos.autoclose),
};

export const Demo_base = {
  name: '⭐ Demo: base',
  render: renderDemo(demos.base),
};

export const Demo_clean = {
  name: '⭐ Demo: clean',
  render: renderDemo(demos.clean),
};

export const Demo_limit = {
  name: '⭐ Demo: limit',
  render: renderDemo(demos.limit),
};

export const Demo_update = {
  name: '⭐ Demo: update',
  render: renderDemo(demos.update),
};

export const Demo_customize = {
  name: '⭐ Demo: customize',
  render: renderDemo(demos.customize),
};

export const Demo_position = {
  name: '⭐ Demo: position',
  render: renderDemo(demos.position),
};

export const Demo_store = {
  name: '⭐ Demo: store',
  render: renderDemo(demos.store),
};
