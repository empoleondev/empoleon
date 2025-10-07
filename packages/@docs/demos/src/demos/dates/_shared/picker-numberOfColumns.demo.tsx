import { Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Component, createSignal } from 'solid-js';

const getCode = (name: string) => `
import { createSignal } from 'solid-js';
import { ${name} } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = createSignal<[string | null, string | null]>([null, null]);
  return (
    <${name} type="range" numberOfColumns={2} value={value()} onChange={setValue} />
  );
}
`;

function getDemo(Component: Component<any>) {
  return () => {
    const [value, setValue] = createSignal<[string | null, string | null]>([null, null]);
    return (
      <>
        <Component
          type="range"
          numberOfColumns={2}
          value={value()}
          onChange={setValue}
          visibleFrom="sm"
        />
        <Text ta="center" hiddenFrom="sm">
          Demo is not available on small screens. Make your screen larger to see the demo.
        </Text>
      </>
    );
  };
}

export function getPickerNumberOfColumnsDemo(Component: Component<any>): EmpoleonDemo {
  return {
    type: 'code',
    centered: true,
    code: getCode((Component as any).displayName!.replace('@empoleon/dates/', '')),
    component: getDemo(Component),
  };
}
