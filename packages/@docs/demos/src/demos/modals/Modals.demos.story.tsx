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
  title: 'Modals',
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

export const Demo_confirm = {
  name: '⭐ Demo: confirm',
  render: renderDemo(demos.confirm),
};

export const Demo_context = {
  name: '⭐ Demo: context',
  render: renderDemo(demos.context),
};

export const Demo_confirmCustomize = {
  name: '⭐ Demo: confirmCustomize',
  render: renderDemo(demos.confirmCustomize),
};

export const Demo_multipleSteps = {
  name: '⭐ Demo: multipleSteps',
  render: renderDemo(demos.multipleSteps),
};

export const Demo_content = {
  name: '⭐ Demo: content',
  render: renderDemo(demos.content),
};

export const Demo_modalProps = {
  name: '⭐ Demo: modalProps',
  render: renderDemo(demos.modalProps),
};

export const Demo_updateModal = {
  name: '⭐ Demo: updateModal',
  render: renderDemo(demos.updateModal),
};

export const Demo_updateContextModal = {
  name: '⭐ Demo: updateContextModal',
  render: renderDemo(demos.updateContextModal),
};
