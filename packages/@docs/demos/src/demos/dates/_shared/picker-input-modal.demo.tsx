import { MantineDemo } from '@empoleonx/demo';
import { Component, createSignal } from 'solid-js';

const getCode = (name: string) => `
import { useState } from 'react';
import { ${name} } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <${name}
      dropdownType="modal"
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
    />
  );
}
`;

function getDemo(Component: Component<any>) {
  return () => {
    const [value, setValue] = createSignal<string | null>(null);
    return (
      <Component
        dropdownType="modal"
        label="Pick date"
        placeholder="Pick date"
        value={value()}
        onChange={setValue}
      />
    );
  };
}

export function getPickerInputModalDemo(Component: Component<any>): MantineDemo {
  return {
    type: 'code',
    centered: true,
    maxWidth: 400,
    code: getCode((Component as any).displayName!.replace('@empoleon/dates/', '')),
    component: getDemo(Component),
  };
}
