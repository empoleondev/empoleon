import { ColorInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { ColorInput } from '@empoleon/core';

function Demo() {
  return <ColorInput readOnly label="Cannot modify value" defaultValue="#F0FCFE" />;
}
`;

function Demo() {
  return <ColorInput readOnly label="Cannot modify value" defaultValue="#F0FCFE" />;
}

export const readOnly: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
