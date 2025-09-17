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
  title: 'Calendar',
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

export const Demo_usage = {
  name: '⭐ Demo: usage',
  render: renderDemo(demos.usage),
};

export const Demo_isStatic = {
  name: '⭐ Demo: isStatic',
  render: renderDemo(demos.isStatic),
};

export const Demo_picker = {
  name: '⭐ Demo: picker',
  render: renderDemo(demos.picker),
};

export const Demo_weekPicker = {
  name: '⭐ Demo: weekPicker',
  render: renderDemo(demos.weekPicker),
};
