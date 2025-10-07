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
  title: 'Field',
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

export const Demo_validateOnBlur = {
  name: '⭐ Demo: validateOnBlur',
  render: renderDemo(demos.validateOnBlur),
};

export const Demo_validateOnChange = {
  name: '⭐ Demo: validateOnChange',
  render: renderDemo(demos.validateOnChange),
};

export const Demo_asyncValidation = {
  name: '⭐ Demo: asyncValidation',
  render: renderDemo(demos.asyncValidation),
};

export const Demo_asyncValidationOnBlur = {
  name: '⭐ Demo: asyncValidationOnBlur',
  render: renderDemo(demos.asyncValidationOnBlur),
};

export const Demo_statusUncontrolled = {
  name: '⭐ Demo: statusUncontrolled',
  render: renderDemo(demos.statusUncontrolled),
};

export const Demo_statusControlled = {
  name: '⭐ Demo: statusControlled',
  render: renderDemo(demos.statusControlled),
};

export const Demo_uncontrolled = {
  name: '⭐ Demo: uncontrolled',
  render: renderDemo(demos.uncontrolled),
};

export const Demo_clearErrorOnChange = {
  name: '⭐ Demo: clearErrorOnChange',
  render: renderDemo(demos.clearErrorOnChange),
};
