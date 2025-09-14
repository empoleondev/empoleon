import { Slider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Slider } from '@empoleon/core';

function Demo() {
  return <Slider defaultValue={60} disabled />;
}
`;

function Demo() {
  return <Slider defaultValue={60} disabled />;
}

export const disabled: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
