import { createEffect, JSX } from 'solid-js';
import { CodeHighlightAdapterProvider, createShikiAdapter } from '@empoleon/code-highlight';
import { EmpoleonProvider, useEmpoleonColorScheme } from '@empoleon/core';
import { renderDemo } from '../../render-demo';
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
  title: 'Styles',
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
export const Demo_className = {
  name: '⭐ Demo: className',
  render: renderDemo(demos.className),
};

export const Demo_globalClasses = {
  name: '⭐ Demo: globalClasses',
  render: renderDemo(demos.globalClasses),
};

export const Demo_responsive = {
  name: '⭐ Demo: responsive',
  render: renderDemo(demos.responsive),
};

export const Demo_sizesMedia = {
  name: '⭐ Demo: sizesMedia',
  render: renderDemo(demos.sizesMedia),
};

export const Demo_useMediaQueryHook = {
  name: '⭐ Demo: useMediaQueryHook',
  render: renderDemo(demos.useMediaQueryHook),
};

export const Demo_classNames = {
  name: '⭐ Demo: classNames',
  render: renderDemo(demos.classNames),
};

export const Demo_styles = {
  name: '⭐ Demo: styles',
  render: renderDemo(demos.styles),
};

export const Demo_responsiveStyleProps = {
  name: '⭐ Demo: responsiveStyleProps',
  render: renderDemo(demos.responsiveStyleProps),
};

export const Demo_directionControl = {
  name: '⭐ Demo: directionControl',
  render: renderDemo(demos.directionControl),
};

export const Demo_rtlMixin = {
  name: '⭐ Demo: rtlMixin',
  render: renderDemo(demos.rtlMixin),
};

export const Demo_dataAttributes = {
  name: '⭐ Demo: dataAttributes',
  render: renderDemo(demos.dataAttributes),
};

export const Demo_unstyled = {
  name: '⭐ Demo: unstyled',
  render: renderDemo(demos.unstyled),
};

export const Demo_vars = {
  name: '⭐ Demo: vars',
  render: renderDemo(demos.vars),
};

export const Demo_customVariant = {
  name: '⭐ Demo: customVariant',
  render: renderDemo(demos.customVariant),
};

export const Demo_dataSize = {
  name: '⭐ Demo: dataSize',
  render: renderDemo(demos.dataSize),
};

export const Demo_classNamesProps = {
  name: '⭐ Demo: classNamesProps',
  render: renderDemo(demos.classNamesProps),
};

export const Demo_remSlider = {
  name: '⭐ Demo: remSlider',
  render: renderDemo(demos.remSlider),
};

export const Demo_hiddenVisible = {
  name: '⭐ Demo: hiddenVisible',
  render: renderDemo(demos.hiddenVisible),
};

export const Demo_lightDarkHidden = {
  name: '⭐ Demo: lightDarkHidden',
  render: renderDemo(demos.lightDarkHidden),
};

export const Demo_containers = {
  name: '⭐ Demo: containers',
  render: renderDemo(demos.containers),
};

export const Demo_useMatchesHook = {
  name: '⭐ Demo: useMatchesHook',
  render: renderDemo(demos.useMatchesHook),
};
