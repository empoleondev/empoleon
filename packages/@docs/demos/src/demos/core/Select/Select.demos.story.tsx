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
  title: 'Select',
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

export const Demo_searchable = {
  name: '⭐ Demo: searchable',
  render: renderDemo(demos.searchable),
};

export const Demo_nothingFound = {
  name: '⭐ Demo: nothingFound',
  render: renderDemo(demos.nothingFound),
};

export const Demo_checkIcon = {
  name: '⭐ Demo: checkIcon',
  render: renderDemo(demos.checkIcon),
};

export const Demo_configurator = {
  name: '⭐ Demo: configurator',
  render: renderDemo(demos.configurator),
};

export const Demo_disabled = {
  name: '⭐ Demo: disabled',
  render: renderDemo(demos.disabled),
};

export const Demo_disabledOptions = {
  name: '⭐ Demo: disabledOptions',
  render: renderDemo(demos.disabledOptions),
};

export const Demo_error = {
  name: '⭐ Demo: error',
  render: renderDemo(demos.error),
};

export const Demo_groups = {
  name: '⭐ Demo: groups',
  render: renderDemo(demos.groups),
};

export const Demo_limit = {
  name: '⭐ Demo: limit',
  render: renderDemo(demos.limit),
};

export const Demo_readOnly = {
  name: '⭐ Demo: readOnly',
  render: renderDemo(demos.readOnly),
};

export const Demo_scrollArea = {
  name: '⭐ Demo: scrollArea',
  render: renderDemo(demos.scrollArea),
};

export const Demo_search = {
  name: '⭐ Demo: search',
  render: renderDemo(demos.search),
};

export const Demo_sort = {
  name: '⭐ Demo: sort',
  render: renderDemo(demos.sort),
};

export const Demo_stylesApi = {
  name: '⭐ Demo: stylesApi',
  render: renderDemo(demos.stylesApi),
};

export const Demo_allowDeselect = {
  name: '⭐ Demo: allowDeselect',
  render: renderDemo(demos.allowDeselect),
};

export const Demo_clearable = {
  name: '⭐ Demo: clearable',
  render: renderDemo(demos.clearable),
};

export const Demo_sections = {
  name: '⭐ Demo: sections',
  render: renderDemo(demos.sections),
};

export const Demo_dropdownOpened = {
  name: '⭐ Demo: dropdownOpened',
  render: renderDemo(demos.dropdownOpened),
};

export const Demo_dropdownPosition = {
  name: '⭐ Demo: dropdownPosition',
  render: renderDemo(demos.dropdownPosition),
};

export const Demo_dropdownAnimation = {
  name: '⭐ Demo: dropdownAnimation',
  render: renderDemo(demos.dropdownAnimation),
};

export const Demo_dropdownPadding = {
  name: '⭐ Demo: dropdownPadding',
  render: renderDemo(demos.dropdownPadding),
};

export const Demo_dropdownShadow = {
  name: '⭐ Demo: dropdownShadow',
  render: renderDemo(demos.dropdownShadow),
};

export const Demo_withinPopover = {
  name: '⭐ Demo: withinPopover',
  render: renderDemo(demos.withinPopover),
};

export const Demo_dropdownOffset = {
  name: '⭐ Demo: dropdownOffset',
  render: renderDemo(demos.dropdownOffset),
};

export const Demo_renderOption = {
  name: '⭐ Demo: renderOption',
  render: renderDemo(demos.renderOption),
};

export const Demo_dropdownWidth = {
  name: '⭐ Demo: dropdownWidth',
  render: renderDemo(demos.dropdownWidth),
};

export const Demo_autoSelectOnBlur = {
  name: '⭐ Demo: autoSelectOnBlur',
  render: renderDemo(demos.autoSelectOnBlur),
};
