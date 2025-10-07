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
  title: 'ColorPicker',
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
export const Demo_formatsConfigurator = {
  name: '⭐ Demo: formatsConfigurator',
  render: renderDemo(demos.formatsConfigurator),
};

export const Demo_sizeConfigurator = {
  name: '⭐ Demo: sizeConfigurator',
  render: renderDemo(demos.sizeConfigurator),
};

export const Demo_swatchesConfigurator = {
  name: '⭐ Demo: swatchesConfigurator',
  render: renderDemo(demos.swatchesConfigurator),
};

export const Demo_swatches = {
  name: '⭐ Demo: swatches',
  render: renderDemo(demos.swatches),
};

export const Demo_swatchesOnly = {
  name: '⭐ Demo: swatchesOnly',
  render: renderDemo(demos.swatchesOnly),
};

export const Demo_usage = {
  name: '⭐ Demo: usage',
  render: renderDemo(demos.usage),
};

export const Demo_fullWidth = {
  name: '⭐ Demo: fullWidth',
  render: renderDemo(demos.fullWidth),
};

export const Demo_stylesApi = {
  name: '⭐ Demo: stylesApi',
  render: renderDemo(demos.stylesApi),
};

export const Demo_hueSlider = {
  name: '⭐ Demo: hueSlider',
  render: renderDemo(demos.hueSlider),
};

export const Demo_alphaSlider = {
  name: '⭐ Demo: alphaSlider',
  render: renderDemo(demos.alphaSlider),
};

export const Demo_kitchenSink = {
  name: '⭐ Demo: kitchenSink',
  render: renderDemo(demos.kitchenSink),
};
