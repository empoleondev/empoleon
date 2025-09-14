import { RingProgress } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { RingProgress } from '@empoleon/core';

function Demo() {
  return <RingProgress sections={[{ value: 40, color: 'yellow' }]} rootColor="red" />;
}
`;

function Demo() {
  return <RingProgress sections={[{ value: 40, color: 'yellow' }]} rootColor="red" />;
}

export const rootColor: EmpoleonDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
