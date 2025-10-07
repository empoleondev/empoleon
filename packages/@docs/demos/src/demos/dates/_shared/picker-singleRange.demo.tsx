import { EmpoleonDemo } from '@empoleonx/demo';
import { Component, createSignal } from 'solid-js';

const getCode = (name: string) => `
import { createSignal } from 'solid-js';
import { ${name} } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = createSignal<[string | null, string | null]>([null, null]);
  return (
    <${name} type="range" allowSingleDateInRange value={value()} onChange={setValue} />
  );
}
`;

function getDemo(Component: Component<any>) {
  return () => {
    const [value, setValue] = createSignal<[string | null, string | null]>([null, null]);
    return <Component type="range" allowSingleDateInRange value={value()} onChange={setValue} />;
  };
}

export function getPickerSingleRangeDemo(Component: Component<any>): EmpoleonDemo {
  return {
    type: 'code',
    centered: true,
    code: getCode((Component as any).displayName!.replace('@empoleon/dates/', '')),
    component: getDemo(Component),
  };
}
