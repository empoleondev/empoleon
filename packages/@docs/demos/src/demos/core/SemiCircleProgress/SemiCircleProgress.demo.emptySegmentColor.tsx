import { SemiCircleProgress } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { SemiCircleProgress } from '@empoleon/core';

function Demo() {
  return <SemiCircleProgress value={30} emptySegmentColor="var(--empoleon-color-dimmed)" />;
}
`;

function Demo() {
  return <SemiCircleProgress value={30} emptySegmentColor="var(--empoleon-color-dimmed)" />;
}

export const emptySegmentColor: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
