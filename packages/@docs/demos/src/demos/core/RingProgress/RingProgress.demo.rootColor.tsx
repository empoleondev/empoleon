import { RingProgress } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { RingProgress } from '@empoleon/core';

function Demo() {
  return <RingProgress sections={[{ value: 40, color: 'yellow' }]} rootColor="red" />;
}
`;

function Demo() {
  return <RingProgress sections={[{ value: 40, color: 'yellow' }]} rootColor="red" />;
}

export const rootColor: MantineDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
