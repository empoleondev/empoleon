import { NumberFormatter } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { NumberFormatter } from '@empoleon/core';

function Demo() {
  return <NumberFormatter prefix="$ " value={1000000} thousandSeparator />;
}
`;

function Demo() {
  return <NumberFormatter prefix="$ " value={1000000} thousandSeparator />;
}

export const usage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
