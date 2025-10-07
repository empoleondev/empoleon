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
  title: 'Combobox',
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
export const Demo_autocomplete = {
  name: '⭐ Demo: autocomplete',
  render: renderDemo(demos.autocomplete),
};

export const Demo_hiddenDropdown = {
  name: '⭐ Demo: hiddenDropdown',
  render: renderDemo(demos.hiddenDropdown),
};

export const Demo_select = {
  name: '⭐ Demo: select',
  render: renderDemo(demos.select),
};

export const Demo_searchableSelect = {
  name: '⭐ Demo: searchableSelect',
  render: renderDemo(demos.searchableSelect),
};

export const Demo_button = {
  name: '⭐ Demo: button',
  render: renderDemo(demos.button),
};

export const Demo_buttonSearch = {
  name: '⭐ Demo: buttonSearch',
  render: renderDemo(demos.buttonSearch),
};

export const Demo_selectFirstOption = {
  name: '⭐ Demo: selectFirstOption',
  render: renderDemo(demos.selectFirstOption),
};

export const Demo_controlledDropdown = {
  name: '⭐ Demo: controlledDropdown',
  render: renderDemo(demos.controlledDropdown),
};

export const Demo_activeOption = {
  name: '⭐ Demo: activeOption',
  render: renderDemo(demos.activeOption),
};

export const Demo_nativeScroll = {
  name: '⭐ Demo: nativeScroll',
  render: renderDemo(demos.nativeScroll),
};

export const Demo_scrollArea = {
  name: '⭐ Demo: scrollArea',
  render: renderDemo(demos.scrollArea),
};

export const Demo_multiselect = {
  name: '⭐ Demo: multiselect',
  render: renderDemo(demos.multiselect),
};

export const Demo_searchableMultiselect = {
  name: '⭐ Demo: searchableMultiselect',
  render: renderDemo(demos.searchableMultiselect),
};

export const Demo_noDropdown = {
  name: '⭐ Demo: noDropdown',
  render: renderDemo(demos.noDropdown),
};

export const Demo_groups = {
  name: '⭐ Demo: groups',
  render: renderDemo(demos.groups),
};

export const Demo_stylesApi = {
  name: '⭐ Demo: stylesApi',
  render: renderDemo(demos.stylesApi),
};

export const Demo_dropdownPosition = {
  name: '⭐ Demo: dropdownPosition',
  render: renderDemo(demos.dropdownPosition),
};

export const Demo_kitchenSink = {
  name: '⭐ Demo: kitchenSink',
  render: renderDemo(demos.kitchenSink),
};
