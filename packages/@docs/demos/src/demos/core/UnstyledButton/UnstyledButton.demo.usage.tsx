import { UnstyledButton } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { UnstyledButton } from '@empoleon/core';

function Demo() {
  return <UnstyledButton>Button without styles</UnstyledButton>;
}
`;

function Demo() {
  return <UnstyledButton>Button without styles</UnstyledButton>;
}

export const usage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
