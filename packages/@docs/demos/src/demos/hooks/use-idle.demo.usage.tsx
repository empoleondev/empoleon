import { Badge } from '@empoleon/core';
import { useIdle } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Badge } from '@empoleon/core';
import { useIdle } from '@empoleon/hooks';

function Demo() {
  const idle = useIdle(2000);
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}
`;

function Demo() {
  const idle = useIdle(2000);
  return <Badge color={idle() ? 'blue' : 'teal'}>Current state: {idle() ? 'idle' : 'not idle'}</Badge>;
}

export const useIdleDemo: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
