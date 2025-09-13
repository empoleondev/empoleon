import { FileInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { FileInput } from '@empoleon/core';

function Demo() {
  return <FileInput disabled label="Disabled input" placeholder="Disabled input" />;
}
`;

function Demo() {
  return <FileInput disabled label="Disabled input" placeholder="Disabled input" />;
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
