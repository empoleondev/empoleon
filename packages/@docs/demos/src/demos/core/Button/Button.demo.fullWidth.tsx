import { Button } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';

function Demo() {
  return <Button fullWidth>Full width button</Button>;
}
`;

function Demo() {
  return <Button fullWidth>Full width button</Button>;
}

export const fullWidth: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
