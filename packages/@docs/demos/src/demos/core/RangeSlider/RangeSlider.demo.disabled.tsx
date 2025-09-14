import { RangeSlider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { RangeSlider } from '@empoleon/core';

function Demo() {
  return <RangeSlider defaultValue={[20, 60]} disabled />;
}
`;

function Demo() {
  return <RangeSlider defaultValue={[20, 60]} disabled />;
}

export const disabled: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
