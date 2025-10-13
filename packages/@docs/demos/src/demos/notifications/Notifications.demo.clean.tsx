import { Button, Code, Group, Stack, Text } from '@empoleon/core';
import { notifications, useNotifications } from '@empoleon/notifications';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Group, Button } from '@empoleon/core';
import { notifications } from '@empoleon/notifications';

function Demo() {
  return (
    <Group justify="center">
      <Button
        onClick={() => {
          Array(10)
            .fill(0)
            .forEach((_, index) => {
              notifications.show({
                title: \`Notification \${index + 1}\`,
                message: 'Most notifications are added to queue',
                autoClose: false,
              });
            });
        }}
      >
        Show 10 notifications
      </Button>

      <Button variant="default" onClick={() => notifications.cleanQueue()}>
        Clean queue
      </Button>

      <Button variant="outline" color="red" onClick={() => notifications.clean()}>
        Clean all
      </Button>
    </Group>
  );
}`;

function Demo() {
  const notificationsStore = useNotifications();

  return (
    <>
      <Group justify="center">
        <Button
          onClick={() => {
            Array(10)
              .fill(0)
              .forEach((_, index) => {
                notifications.show({
                  title: `Notification ${index + 1}`,
                  message: 'Most notifications are added to queue',
                  autoClose: false,
                });
              });
          }}
        >
          Show 10 notifications
        </Button>

        <Button variant="default" onClick={() => notifications.cleanQueue()}>
          Clean queue
        </Button>

        <Button variant="outline" color="red" onClick={() => notifications.clean()}>
          Clean all
        </Button>
      </Group>
      <Stack>
        <Text>Notifications state</Text>
        <Code block>{JSON.stringify(notificationsStore().notifications, null, 2)}</Code>

        <Text mt="md">Notifications queue</Text>
        <Code block>{JSON.stringify(notificationsStore().queue, null, 2)}</Code>
      </Stack>
    </>
  );
}

export const clean: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
