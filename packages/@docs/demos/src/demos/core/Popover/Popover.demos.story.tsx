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
  title: 'Popover',
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

export const Demo_form = {
  name: '⭐ Demo: form',
  render: renderDemo(demos.form),
};

export const Demo_hover = {
  name: '⭐ Demo: hover',
  render: renderDemo(demos.hover),
};

export const Demo_sameWidth = {
  name: '⭐ Demo: sameWidth',
  render: renderDemo(demos.sameWidth),
};

export const Demo_inline = {
  name: '⭐ Demo: inline',
  render: renderDemo(demos.inline),
};

export const Demo_offsetAxis = {
  name: '⭐ Demo: offsetAxis',
  render: renderDemo(demos.offsetAxis),
};

export const Demo_offset = {
  name: '⭐ Demo: offset',
  render: renderDemo(demos.offset),
};

export const Demo_arrow = {
  name: '⭐ Demo: arrow',
  render: renderDemo(demos.arrow),
};

export const Demo_clickOutsideEvents = {
  name: '⭐ Demo: clickOutsideEvents',
  render: renderDemo(demos.clickOutsideEvents),
};

export const Demo_disabled = {
  name: '⭐ Demo: disabled',
  render: renderDemo(demos.disabled),
};

export const Demo_portalChildren = {
  name: '⭐ Demo: portalChildren',
  render: renderDemo(demos.portalChildren),
};

export const Demo_overlay = {
  name: '⭐ Demo: overlay',
  render: renderDemo(demos.overlay),
};

export const Demo_hideDetached = {
  name: '⭐ Demo: hideDetached',
  render: renderDemo(demos.hideDetached),
};

export const Demo_kitchenSink = {
  name: '⭐ Demo: kitchenSink',
  render: renderDemo(demos.kitchenSink),
};
