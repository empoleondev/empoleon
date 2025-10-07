import { Component, createSignal } from 'solid-js';
import { EmpoleonDemo } from '@empoleonx/demo';

const getCode = (name: string) => `
import { createSignal } from 'solid-js';
import { ${name} } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = createSignal<string | null>(null);
  return (
    <${name}
      label="Pick date"
      placeholder="Pick date"
      value={value()}
      onChange={setValue}
    />
  );
}
`;

function getDemo(Component: Component<any>) {
  return () => {
    const [value, setValue] = createSignal<string | null>(null);
    return (
      <Component label="Pick date" placeholder="Pick date" value={value()} onChange={setValue} />
    );
  };
}

export function getPickerInputUsageDemo(Component: Component<any>): EmpoleonDemo {
  return {
    type: 'code',
    centered: true,
    maxWidth: 400,
    code: getCode((Component as any).displayName!.replace('@empoleon/dates/', '')),
    component: getDemo(Component),
  };
}
