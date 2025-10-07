import { createEffect, JSX } from 'solid-js';
import { CodeHighlightAdapterProvider, createShikiAdapter } from '@empoleon/code-highlight';
import { EmpoleonProvider, useEmpoleonColorScheme } from '@empoleon/core';
import { renderDemo } from '../../../render-demo';
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
  title: 'Tabs',
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

export const Demo_position = {
  name: '⭐ Demo: position',
  render: renderDemo(demos.position),
};

export const Demo_pull = {
  name: '⭐ Demo: pull',
  render: renderDemo(demos.pull),
};

export const Demo_inverted = {
  name: '⭐ Demo: inverted',
  render: renderDemo(demos.inverted),
};

export const Demo_placement = {
  name: '⭐ Demo: placement',
  render: renderDemo(demos.placement),
};

export const Demo_disabled = {
  name: '⭐ Demo: disabled',
  render: renderDemo(demos.disabled),
};

export const Demo_colors = {
  name: '⭐ Demo: colors',
  render: renderDemo(demos.colors),
};

export const Demo_deactivate = {
  name: '⭐ Demo: deactivate',
  render: renderDemo(demos.deactivate),
};

export const Demo_keyboardActivation = {
  name: '⭐ Demo: keyboardActivation',
  render: renderDemo(demos.keyboardActivation),
};

export const Demo_customize = {
  name: '⭐ Demo: customize',
  render: renderDemo(demos.customize),
};

export const Demo_stylesApi = {
  name: '⭐ Demo: stylesApi',
  render: renderDemo(demos.stylesApi),
};

export const Demo_kitchenSink = {
  name: '⭐ Demo: kitchenSink',
  render: renderDemo(demos.kitchenSink),
};
