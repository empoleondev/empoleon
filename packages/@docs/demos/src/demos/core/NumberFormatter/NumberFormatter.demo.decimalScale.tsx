import { NumberFormatter } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { NumberFormatter } from '@empoleon/core';

function Demo() {
  return <NumberFormatter value={5 / 3} decimalScale={2} />;
}
`;

function Demo() {
  return <NumberFormatter value={5 / 3} decimalScale={2} />;
}

export const decimalScale: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
