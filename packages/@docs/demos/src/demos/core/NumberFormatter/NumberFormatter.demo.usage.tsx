import { NumberFormatter } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { NumberFormatter } from '@empoleon/core';

function Demo() {
  return <NumberFormatter prefix="$ " value={1000000} thousandSeparator />;
}
`;

function Demo() {
  return <NumberFormatter prefix="$ " value={1000000} thousandSeparator />;
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
