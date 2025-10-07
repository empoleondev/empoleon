import dayjs from 'dayjs';
import { Component } from 'solid-js';
import { EmpoleonDemo } from '@empoleonx/demo';

const getCode = (name: string) => `
import dayjs from 'dayjs';
import { ${name} } from '@empoleon/dates';

function Demo() {
  return (
    <${name}
      clearable
      defaultValue={dayjs().format('YYYY-MM-DD')}
      label="Pick date"
      placeholder="Pick date"
    />
  );
}
`;

function getDemo(Component: Component<any>) {
  return () => (
    <Component
      clearable
      defaultValue={dayjs().format('YYYY-MM-DD')}
      label="Pick date"
      placeholder="Pick date"
    />
  );
}

export function getPickerInputClearableDemo(Component: Component<any>): EmpoleonDemo {
  return {
    type: 'code',
    centered: true,
    maxWidth: 400,
    code: getCode((Component as any).displayName!.replace('@empoleon/dates/', '')),
    component: getDemo(Component),
  };
}
