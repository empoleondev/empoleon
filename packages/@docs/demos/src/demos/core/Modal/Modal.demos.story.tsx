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
  title: 'Modal',
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

export const Demo_header = {
  name: '⭐ Demo: header',
  render: renderDemo(demos.header),
};

export const Demo_sizes = {
  name: '⭐ Demo: sizes',
  render: renderDemo(demos.sizes),
};

export const Demo_overlay = {
  name: '⭐ Demo: overlay',
  render: renderDemo(demos.overlay),
};

export const Demo_overflow = {
  name: '⭐ Demo: overflow',
  render: renderDemo(demos.overflow),
};

export const Demo_transitions = {
  name: '⭐ Demo: transitions',
  render: renderDemo(demos.transitions),
};

export const Demo_centered = {
  name: '⭐ Demo: centered',
  render: renderDemo(demos.centered),
};

export const Demo_fullScreen = {
  name: '⭐ Demo: fullScreen',
  render: renderDemo(demos.fullScreen),
};

export const Demo_sizeAuto = {
  name: '⭐ Demo: sizeAuto',
  render: renderDemo(demos.sizeAuto),
};

export const Demo_scrollarea = {
  name: '⭐ Demo: scrollarea',
  render: renderDemo(demos.scrollarea),
};

export const Demo_composition = {
  name: '⭐ Demo: composition',
  render: renderDemo(demos.composition),
};

export const Demo_offset = {
  name: '⭐ Demo: offset',
  render: renderDemo(demos.offset),
};

export const Demo_initialFocus = {
  name: '⭐ Demo: initialFocus',
  render: renderDemo(demos.initialFocus),
};

export const Demo_fullScreenMobile = {
  name: '⭐ Demo: fullScreenMobile',
  render: renderDemo(demos.fullScreenMobile),
};

export const Demo_closeIcon = {
  name: '⭐ Demo: closeIcon',
  render: renderDemo(demos.closeIcon),
};

export const Demo_initialFocusTrap = {
  name: '⭐ Demo: initialFocusTrap',
  render: renderDemo(demos.initialFocusTrap),
};

export const Demo_stack = {
  name: '⭐ Demo: stack',
  render: renderDemo(demos.stack),
};

export const Demo_transitionEnd = {
  name: '⭐ Demo: transitionEnd',
  render: renderDemo(demos.transitionEnd),
};

export const Demo_kitchenSink = {
  name: '⭐ Demo: kitchenSink',
  render: renderDemo(demos.kitchenSink),
};
