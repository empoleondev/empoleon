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
  title: 'Pagination',
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
export const Demo_configurator = {
  name: '⭐ Demo: configurator',
  render: renderDemo(demos.configurator),
};

export const Demo_siblings = {
  name: '⭐ Demo: siblings',
  render: renderDemo(demos.siblings),
};

export const Demo_boundaries = {
  name: '⭐ Demo: boundaries',
  render: renderDemo(demos.boundaries),
};

export const Demo_usage = {
  name: '⭐ Demo: usage',
  render: renderDemo(demos.usage),
};

export const Demo_stylesApi = {
  name: '⭐ Demo: stylesApi',
  render: renderDemo(demos.stylesApi),
};

export const Demo_composition = {
  name: '⭐ Demo: composition',
  render: renderDemo(demos.composition),
};

export const Demo_icons = {
  name: '⭐ Demo: icons',
  render: renderDemo(demos.icons),
};

export const Demo_links = {
  name: '⭐ Demo: links',
  render: renderDemo(demos.links),
};

export const Demo_withContent = {
  name: '⭐ Demo: withContent',
  render: renderDemo(demos.withContent),
};

export const Demo_autoContrast = {
  name: '⭐ Demo: autoContrast',
  render: renderDemo(demos.autoContrast),
};
export const Demo_withPages = {
  name: '⭐ Demo: withPages',
  render: renderDemo(demos.withPages),
};
