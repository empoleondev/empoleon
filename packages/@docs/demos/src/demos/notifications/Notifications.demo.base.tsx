import { Button } from '@empoleon/core';
import { notifications } from '@empoleon/notifications';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';
import { notifications } from '@empoleon/notifications';

function Demo() {
  return (
    <Button
      onClick={() =>
        notifications.show({
          title: 'Default notification',
          message: 'Do not forget to star Mantine on GitHub! 🌟',
        })
      }
    >
      Show notification
    </Button>
  );
}`;

function Demo() {
  return (
    <Button
      onClick={() =>
        notifications.show({
          title: 'Default notification',
          message: 'Do not forget to star Mantine on GitHub! 🌟',
        })
      }
    >
      Show notification
    </Button>
  );
}

export const base: MantineDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
