import { ColorInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { ColorInput } from '@empoleon/core';

function Demo() {
  return <ColorInput disabled label="Disabled input" placeholder="Disabled input" />;
}
`;

function Demo() {
  return <ColorInput disabled label="Disabled input" placeholder="Disabled input" />;
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
