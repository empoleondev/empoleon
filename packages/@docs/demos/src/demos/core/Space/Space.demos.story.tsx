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
  title: 'Space',
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
export const Demo_horizontal = {
  name: '⭐ Demo: horizontal',
  render: renderDemo(demos.horizontal),
};

export const Demo_vertical = {
  name: '⭐ Demo: vertical',
  render: renderDemo(demos.vertical),
};
