import { AngleSlider } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { AngleSlider } from '@empoleon/core';

function Demo() {
  return <AngleSlider aria-label="Angle slider" formatLabel={(value) => \`\${value}°\`} />;
}
`;

function Demo() {
  return <AngleSlider aria-label="Angle slider" formatLabel={(value) => `${value}°`} />;
}

export const formatLabel: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
