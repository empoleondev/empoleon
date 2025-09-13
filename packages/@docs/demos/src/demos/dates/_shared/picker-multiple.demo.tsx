import { MantineDemo } from '@empoleonx/demo';
import { Component, createSignal } from 'solid-js';

const getCode = (name: string) => `
import { useState } from 'react';
import { ${name} } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = useState<string[]>([]);
  return <${name} type="multiple" value={value} onChange={setValue} />;
}
`;

function getDemo(Component: Component) {
  return () => {
    const [value, setValue] = createSignal<string[]>([]);
    // @ts-ignore
    return <Component type="multiple" value={value()} onChange={setValue} />;
  };
}

export function getPickerMultipleDemo(Component: Component): MantineDemo {
  return {
    type: 'code',
    centered: true,
    code: getCode((Component as any).displayName!.replace('@empoleon/dates/', '')),
    component: getDemo(Component),
  };
}
