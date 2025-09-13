import { Badge } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Badge } from '@empoleon/core';

function Demo() {
  return <Badge fullWidth>Full width badge</Badge>;
}
`;

function Demo() {
  return <Badge fullWidth>Full width badge</Badge>;
}

export const fullWidth: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
