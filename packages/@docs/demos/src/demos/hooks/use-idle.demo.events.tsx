import { Badge } from '@empoleon/core';
import { useIdle } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const eventsCode = `
import { Badge } from '@empoleon/core';
import { useIdle } from '@empoleon/hooks';

function Demo() {
  const idle = useIdle(2000, { events: ['click', 'touchstart'] });
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}
`;

function Demo() {
  const idle = useIdle(2000, { events: ['click', 'touchstart'] });
  return (
    <Badge color={idle() ? 'blue' : 'teal'}>Current state: {idle() ? 'idle' : 'not idle'}</Badge>
  );
}

export const useIdleEvents: EmpoleonDemo = {
  type: 'code',
  code: eventsCode,
  component: Demo,
  centered: true,
};
