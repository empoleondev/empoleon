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
  title: 'Menu',
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

export const Demo_transitions = {
  name: '⭐ Demo: transitions',
  render: renderDemo(demos.transitions),
};

export const Demo_component = {
  name: '⭐ Demo: component',
  render: renderDemo(demos.component),
};

export const Demo_hover = {
  name: '⭐ Demo: hover',
  render: renderDemo(demos.hover),
};

export const Demo_stylesApi = {
  name: '⭐ Demo: stylesApi',
  render: renderDemo(demos.stylesApi),
};

export const Demo_positionConfigurator = {
  name: '⭐ Demo: positionConfigurator',
  render: renderDemo(demos.positionConfigurator),
};

export const Demo_disabled = {
  name: '⭐ Demo: disabled',
  render: renderDemo(demos.disabled),
};

export const Demo_customControl = {
  name: '⭐ Demo: customControl',
  render: renderDemo(demos.customControl),
};

export const Demo_clickHover = {
  name: '⭐ Demo: clickHover',
  render: renderDemo(demos.clickHover),
};

export const Demo_navigation = {
  name: '⭐ Demo: navigation',
  render: renderDemo(demos.navigation),
};

export const Demo_sub = {
  name: '⭐ Demo: sub',
  render: renderDemo(demos.sub),
};
