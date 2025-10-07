import { createEffect, createSignal } from 'solid-js';
import { Button, EmpoleonProvider, Group, useEmpoleonColorScheme } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = (props: any) => `
import { EmpoleonProvider, Button, Group } from '@empoleon/core';

function Demo() {
  return (
    <EmpoleonProvider theme={{ primaryShade: ${props.primaryShade} }}>
      <Group>
        <Button>Filled</Button>
        <Button variant="light">Light</Button>
        <Button variant="outline">Outline</Button>
      </Group>
    </EmpoleonProvider>
  );
}
`;

function Wrapper(props: any) {
  const [attr, setAttr] = createSignal<string | undefined>(undefined);
  const { colorScheme } = useEmpoleonColorScheme();

  createEffect(() => {
    setAttr(colorScheme);
  });

  return (
    <div id="primary-color-demo-root" data-mantine-color-scheme={attr()}>
      <EmpoleonProvider
        cssVariablesSelector="#primary-color-demo-root"
        getRootElement={() => document.createElement('div')}
        theme={{ primaryShade: props.primaryShade }}
      >
        <Group>
          <Button>Filled</Button>
          <Button variant="light">Light</Button>
          <Button variant="outline">Outline</Button>
        </Group>
      </EmpoleonProvider>
    </div>
  );
}

export const primaryShadeConfigurator: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      type: 'number',
      prop: 'primaryShade',
      initialValue: 6,
      libraryValue: '__none__',
      min: 0,
      max: 9,
    },
  ],
};
