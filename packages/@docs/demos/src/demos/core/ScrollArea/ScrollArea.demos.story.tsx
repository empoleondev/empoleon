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
  title: 'ScrollArea',
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

export const Demo_horizontal = {
  name: '⭐ Demo: horizontal',
  render: renderDemo(demos.horizontal),
};

export const Demo_scrollTo = {
  name: '⭐ Demo: scrollTo',
  render: renderDemo(demos.scrollTo),
};

export const Demo_scrollPosition = {
  name: '⭐ Demo: scrollPosition',
  render: renderDemo(demos.scrollPosition),
};

export const Demo_maxHeight = {
  name: '⭐ Demo: maxHeight',
  render: renderDemo(demos.maxHeight),
};

export const Demo_stylesApi = {
  name: '⭐ Demo: stylesApi',
  render: renderDemo(demos.stylesApi),
};

export const Demo_scrollIntoView = {
  name: '⭐ Demo: scrollIntoView',
  render: renderDemo(demos.scrollIntoView),
};

export const Demo_autosizePopover = {
  name: '⭐ Demo: autosizePopover',
  render: renderDemo(demos.autosizePopover),
};
export const Demo_scrollbars = {
  name: '⭐ Demo: scrollbars',
  render: renderDemo(demos.scrollbars),
};
