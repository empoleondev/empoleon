import { AngleSlider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { AngleSlider } from '@empoleon/core';

function Demo() {
  return <AngleSlider aria-label="Angle slider" formatLabel={(value) => \`\${value}°\`} />;
}
`;

function Demo() {
  return <AngleSlider aria-label="Angle slider" formatLabel={(value) => `${value}°`} />;
}

export const formatLabel: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
