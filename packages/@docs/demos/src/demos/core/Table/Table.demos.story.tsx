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
  title: 'Table',
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

export const Demo_captions = {
  name: '⭐ Demo: captions',
  render: renderDemo(demos.captions),
};

export const Demo_configurator = {
  name: '⭐ Demo: configurator',
  render: renderDemo(demos.configurator),
};

export const Demo_spacingConfigurator = {
  name: '⭐ Demo: spacingConfigurator',
  render: renderDemo(demos.spacingConfigurator),
};

export const Demo_scrollContainer = {
  name: '⭐ Demo: scrollContainer',
  render: renderDemo(demos.scrollContainer),
};

export const Demo_scrollContainerMaxHeight = {
  name: '⭐ Demo: scrollContainer maxHeight',
  render: renderDemo(demos.scrollContainerMaxHeight),
};

export const Demo_scrollContainerNative = {
  name: '⭐ Demo: scrollContainerNative',
  render: renderDemo(demos.scrollContainerNative),
};

export const Demo_scrollContainerNativeMaxHeight = {
  name: '⭐ Demo: scrollContainerNative maxHeight',
  render: renderDemo(demos.scrollContainerNativeMaxHeight),
};

export const Demo_scrollRowSelection = {
  name: '⭐ Demo: rowSelection',
  render: renderDemo(demos.rowSelection),
};

export const Demo_data = {
  name: '⭐ Demo: data',
  render: renderDemo(demos.data),
};

export const Demo_stickyHeader = {
  name: '⭐ Demo: stickyHeader',
  render: renderDemo(demos.stickyHeader),
};

export const Demo_vertical = {
  name: '⭐ Demo: vertical',
  render: renderDemo(demos.vertical),
};

export const Demo_tabularNums = {
  name: '⭐ Demo: tabularNums',
  render: renderDemo(demos.tabularNums),
};

export const Demo_kitchenSink = {
  name: '⭐ Demo: kitchenSink',
  render: renderDemo(demos.kitchenSink),
};
