import { UnstyledButton } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { UnstyledButton } from '@empoleon/core';

function Demo() {
  return <UnstyledButton>Button without styles</UnstyledButton>;
}
`;

function Demo() {
  return <UnstyledButton>Button without styles</UnstyledButton>;
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
