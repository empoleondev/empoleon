import { JsonInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { JsonInput } from '@empoleon/core';

function Demo() {
  return (
    <JsonInput disabled defaultValue='{ "a": 1, "B": 2 }' label="Disabled" placeholder="Disabled" />
  );
}
`;

function Demo() {
  return (
    <JsonInput disabled defaultValue='{ "a": 1, "B": 2 }' label="Disabled" placeholder="Disabled" />
  );
}

export const disabled: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
