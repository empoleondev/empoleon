import { Button } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';

function Demo() {
  return <Button fullWidth>Full width button</Button>;
}
`;

function Demo() {
  return <Button fullWidth>Full width button</Button>;
}

export const fullWidth: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
