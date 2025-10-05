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
  title: 'RangeSlider',
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

export const Demo_decimal = {
  name: '⭐ Demo: decimal',
  render: renderDemo(demos.decimal),
};

export const Demo_disabled = {
  name: '⭐ Demo: disabled',
  render: renderDemo(demos.disabled),
};

export const Demo_domain = {
  name: '⭐ Demo: domain',
  render: renderDemo(demos.domain),
};

export const Demo_inverted = {
  name: '⭐ Demo: inverted',
  render: renderDemo(demos.inverted),
};

export const Demo_label = {
  name: '⭐ Demo: label',
  render: renderDemo(demos.label),
};

export const Demo_marks = {
  name: '⭐ Demo: marks',
  render: renderDemo(demos.marks),
};

export const Demo_pushOnOverlap = {
  name: '⭐ Demo: pushOnOverlap',
  render: renderDemo(demos.pushOnOverlap),
};

export const Demo_restrictToMarks = {
  name: '⭐ Demo: restrictToMarks',
  render: renderDemo(demos.restrictToMarks),
};

export const Demo_step = {
  name: '⭐ Demo: step',
  render: renderDemo(demos.step),
};

export const Demo_kitchenSink = {
  name: '⭐ Demo: kitchenSink',
  render: renderDemo(demos.kitchenSink),
};
