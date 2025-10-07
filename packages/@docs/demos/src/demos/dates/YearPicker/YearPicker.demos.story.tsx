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
  title: 'YearPicker',
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

export const Demo_multiple = {
  name: '⭐ Demo: multiple',
  render: renderDemo(demos.multiple),
};

export const Demo_deselect = {
  name: '⭐ Demo: deselect',
  render: renderDemo(demos.deselect),
};

export const Demo_range = {
  name: '⭐ Demo: range',
  render: renderDemo(demos.range),
};

export const Demo_singleRange = {
  name: '⭐ Demo: singleRange',
  render: renderDemo(demos.singleRange),
};

export const Demo_numberOfColumns = {
  name: '⭐ Demo: numberOfColumns',
  render: renderDemo(demos.numberOfColumns),
};

export const Demo_sizeConfigurator = {
  name: '⭐ Demo: sizeConfigurator',
  render: renderDemo(demos.sizeConfigurator),
};

export const Demo_minMax = {
  name: '⭐ Demo: minMax',
  render: renderDemo(demos.minMax),
};

export const Demo_controlProps = {
  name: '⭐ Demo: controlProps',
  render: renderDemo(demos.controlProps),
};

export const Demo_yearsListFormat = {
  name: '⭐ Demo: yearsListFormat',
  render: renderDemo(demos.yearsListFormat),
};

export const Demo_decadeLabelFormat = {
  name: '⭐ Demo: decadeLabelFormat',
  render: renderDemo(demos.decadeLabelFormat),
};

export const Demo_defaultDate = {
  name: '⭐ Demo: defaultDate',
  render: renderDemo(demos.defaultDate),
};

export const Demo_controlledDate = {
  name: '⭐ Demo: controlledDate',
  render: renderDemo(demos.controlledDate),
};
