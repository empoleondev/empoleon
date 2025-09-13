import { Button } from '@empoleon/core';
import { useLongPress } from '@empoleon/hooks';
import { notifications } from '@empoleon/notifications';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';
import { useLongPress } from '@empoleon/hooks';
import { notifications } from '@empoleon/notifications';

function Demo() {
  const handlers = useLongPress(() => notifications.show({ message: 'Long press triggered' }));
  return <Button {...handlers}>Press and hold</Button>;
}
`;

function Demo() {
  const handlers = useLongPress(() => notifications.show({ message: 'Long press triggered' }));
  return <Button {...handlers}>Press and hold</Button>;
}

export const useLongPressDemo: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
