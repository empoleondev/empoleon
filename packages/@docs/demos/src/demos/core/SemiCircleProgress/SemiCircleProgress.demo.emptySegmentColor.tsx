import { SemiCircleProgress } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { SemiCircleProgress } from '@empoleon/core';

function Demo() {
  return <SemiCircleProgress value={30} emptySegmentColor="var(--mantine-color-dimmed)" />;
}
`;

function Demo() {
  return <SemiCircleProgress value={30} emptySegmentColor="var(--mantine-color-dimmed)" />;
}

export const emptySegmentColor: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
