import { PinInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { PinInput } from '@empoleon/core';

function Demo() {
  return <PinInput type={/^[0-3]*$/} inputType="tel" inputMode="numeric" />;
}
`;

function Demo() {
  return <PinInput type={/^[0-3]*$/} inputType="tel" inputMode="numeric" />;
}

export const regexp: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
