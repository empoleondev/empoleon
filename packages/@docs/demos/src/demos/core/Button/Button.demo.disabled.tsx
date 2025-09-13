import { Button } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';

function Demo() {
  return <Button disabled>Disabled button</Button>;
}
`;

function Demo() {
  return <Button disabled>Disabled button</Button>;
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
