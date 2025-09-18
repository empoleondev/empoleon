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
  title: 'Text',
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

export const Demo_linesConfigurator = {
  name: '⭐ Demo: linesConfigurator',
  render: renderDemo(demos.linesConfigurator),
};

export const Demo_lineClamp = {
  name: '⭐ Demo: lineClamp',
  render: renderDemo(demos.lineClamp),
};

export const Demo_gradient = {
  name: '⭐ Demo: gradient',
  render: renderDemo(demos.gradient),
};

export const Demo_inherit = {
  name: '⭐ Demo: inherit',
  render: renderDemo(demos.inherit),
};

export const Demo_truncate = {
  name: '⭐ Demo: truncate',
  render: renderDemo(demos.truncate),
};
