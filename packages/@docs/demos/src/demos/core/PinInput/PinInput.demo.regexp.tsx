import { PinInput } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { PinInput } from '@empoleon/core';

function Demo() {
  return <PinInput type={/^[0-3]*$/} inputType="tel" inputMode="numeric" />;
}
`;

function Demo() {
  return <PinInput type={/^[0-3]*$/} input-type="tel" inputMode="numeric" />;
}

export const regexp: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
