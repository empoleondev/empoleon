import { RangeSlider } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { RangeSlider } from '@empoleon/core';

function Demo() {
  return <RangeSlider defaultValue={[20, 60]} disabled />;
}
`;

function Demo() {
  return <RangeSlider defaultValue={[20, 60]} disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
