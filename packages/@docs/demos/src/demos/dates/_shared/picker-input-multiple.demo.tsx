import { EmpoleonDemo } from '@empoleonx/demo';
import { Component, createSignal } from 'solid-js';

const getCode = (name: string) => `
import { createSignal } from 'solid-js';
import { ${name} } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = createSignal<string[]>([]);
  return (
    <${name}
      type="multiple"
      label="Pick dates"
      placeholder="Pick dates"
      value={value()}
      onChange={setValue}
    />
  );
}
`;

function getDemo(Component: Component<any>) {
  return () => {
    const [value, setValue] = createSignal<string[]>([]);
    return (
      <Component
        type="multiple"
        label="Pick dates"
        placeholder="Pick dates"
        value={value()}
        onChange={setValue}
      />
    );
  };
}

export function getPickerInputMultipleDemo(Component: Component<any>): EmpoleonDemo {
  return {
    type: 'code',
    centered: true,
    maxWidth: 400,
    code: getCode((Component as any).displayName!.replace('@empoleon/dates/', '')),
    component: getDemo(Component),
  };
}
