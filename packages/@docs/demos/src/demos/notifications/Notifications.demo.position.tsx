import { Button, Group } from '@empoleon/core';
import { notifications } from '@empoleon/notifications';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';
import { notifications } from '@empoleon/notifications';

const positions = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'top-center',
  'bottom-center',
] as const;

function Demo() {
  const buttons = positions.map((position) => (
    <Button
      key={position}
      onClick={() =>
        notifications.show({
          title: \`Notification at \${position}\`,
          message: \`Notification at \${position} message\`,
          position,
        })
      }
    >
      {position}
    </Button>
  ));

  return <Group>{buttons}</Group>;
}`;

const positions = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'top-center',
  'bottom-center',
] as const;

function Demo() {
  const buttons = positions.map((position) => (
    <Button
      onClick={() =>
        notifications.show({
          title: `Notification at ${position}`,
          message: `Notification at ${position} message`,
          position,
        })
      }
    >
      {position}
    </Button>
  ));

  return <Group>{buttons}</Group>;
}

export const position: MantineDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
