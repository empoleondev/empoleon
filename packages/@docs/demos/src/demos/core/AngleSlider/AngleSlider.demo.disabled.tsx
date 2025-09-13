import { AngleSlider } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { AngleSlider } from '@empoleon/core';

function Demo() {
  return <AngleSlider aria-label="Angle slider" disabled />;
}
`;

function Demo() {
  return <AngleSlider aria-label="Angle slider" disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
