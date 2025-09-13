import { RangeSlider } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { RangeSlider } from '@empoleon/core';

function Demo() {
  return <RangeSlider inverted defaultValue={[20, 60]} />;
}
`;

function Demo() {
  return <RangeSlider inverted defaultValue={[20, 60]} />;
}

export const inverted: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
