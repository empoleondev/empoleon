import { RangeSlider } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { RangeSlider } from '@empoleon/core';

function Demo() {
  return <RangeSlider min={0} max={1} minRange={0.2} step={0.0005} defaultValue={[0.2, 0.8]} />;
}
`;

function Demo() {
  return <RangeSlider min={0} max={1} minRange={0.2} step={0.0005} defaultValue={[0.2, 0.8]} />;
}

export const decimal: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
