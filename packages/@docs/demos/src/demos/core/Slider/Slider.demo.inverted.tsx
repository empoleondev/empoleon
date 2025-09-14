import { Slider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Slider } from '@empoleon/core';

function Demo() {
  return <Slider inverted defaultValue={80} />;
}
`;

function Demo() {
  return <Slider inverted defaultValue={80} />;
}

export const inverted: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
