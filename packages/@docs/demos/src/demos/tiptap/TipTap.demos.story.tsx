import { createEffect, JSX } from 'solid-js';
import { renderDemo } from '../../render-demo';
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
  title: 'TipTap',
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

export const Demo_colors = {
  name: '⭐ Demo: colors',
  render: renderDemo(demos.colors),
};

export const Demo_codeHighlight = {
  name: '⭐ Demo: codeHighlight',
  render: renderDemo(demos.codeHighlight),
};

export const Demo_bubbleMenu = {
  name: '⭐ Demo: bubbleMenu',
  render: renderDemo(demos.bubbleMenu),
};

export const Demo_floatingMenu = {
  name: '⭐ Demo: floatingMenu',
  render: renderDemo(demos.floatingMenu),
};

export const Demo_customControl = {
  name: '⭐ Demo: customControl',
  render: renderDemo(demos.customControl),
};

export const Demo_icons = {
  name: '⭐ Demo: icons',
  render: renderDemo(demos.icons),
};

export const Demo_placeholder = {
  name: '⭐ Demo: placeholder',
  render: renderDemo(demos.placeholder),
};

export const Demo_tasks = {
  name: '⭐ Demo: tasks',
  render: renderDemo(demos.tasks),
};

export const Demo_typographyStyles = {
  name: '⭐ Demo: typographyStyles',
  render: renderDemo(demos.typographyStyles),
};

export const Demo_subtleVariant = {
  name: '⭐ Demo: subtleVariant',
  render: renderDemo(demos.subtleVariant),
};

export const Demo_sourceCodeSwitcher = {
  name: '⭐ Demo: sourceCodeSwitcher',
  render: renderDemo(demos.sourceCodeSwitcher),
};
