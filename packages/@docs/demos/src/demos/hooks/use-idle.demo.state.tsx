import { Badge } from '@empoleon/core';
import { useIdle } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const initialStateCode = `
import { Badge } from '@empoleon/core';
import { useIdle } from '@empoleon/hooks';

function Demo() {
  const idle = useIdle(2000, { initialState: false });
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}
`;

function Demo() {
  const idle = useIdle(2000, { initialState: false });
  return <Badge color={idle() ? 'blue' : 'teal'}>Current state: {idle() ? 'idle' : 'not idle'}</Badge>;
}

export const useIdleInitialState: EmpoleonDemo = {
  type: 'code',
  code: initialStateCode,
  component: Demo,
  centered: true,
};
