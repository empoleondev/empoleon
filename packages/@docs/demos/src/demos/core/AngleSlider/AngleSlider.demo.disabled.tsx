import { AngleSlider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { AngleSlider } from '@empoleon/core';

function Demo() {
  return <AngleSlider aria-label="Angle slider" disabled />;
}
`;

function Demo() {
  return <AngleSlider aria-label="Angle slider" disabled />;
}

export const disabled: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
