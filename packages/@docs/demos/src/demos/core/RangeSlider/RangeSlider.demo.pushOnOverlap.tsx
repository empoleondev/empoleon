import { RangeSlider } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { RangeSlider } from '@empoleon/core';

function Demo() {
  return <RangeSlider pushOnOverlap={false} defaultValue={[25, 65]} minRange={20} />;
}
`;

function Demo() {
  return <RangeSlider pushOnOverlap={false} defaultValue={[25, 65]} minRange={20} />;
}

export const pushOnOverlap: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
