import { For } from 'solid-js';
import { Badge, Button, Group, Modal, Text } from '@empoleon/core';
import { useCounter, useDisclosure } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { For } from 'solid-js';
import { useDisclosure, useCounter } from '@empoleon/hooks';
import { Modal, Button, Group, Text, Badge } from '@empoleon/core';

function Demo() {
  const [opened, { close, open }] = useDisclosure(false);
  const [count, { increment, decrement }] = useCounter(3, { min: 0 });

  return (
    <>
      <Modal opened={opened()} onClose={close} size="auto" title="Modal size auto">
        <Text>Modal with size auto will fits its content</Text>

        <Group wrap="nowrap" mt="md">
          <For each={Array(count()).fill(0)}>
            {(_, index) => <Badge>Badge {index()}</Badge>}
          </For>
        </Group>

        <Group mt="xl">
          <Button onClick={increment}>Add badge</Button>
          <Button onClick={decrement}>Remove badge</Button>
        </Group>
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
`;

function Demo() {
  const [opened, { close, open }] = useDisclosure(false);
  const [count, { increment, decrement }] = useCounter(3, { min: 0 });

  return (
    <>
      <Modal opened={opened()} onClose={close} size="auto" title="Modal size auto">
        <Text>Modal with size auto will fits its content</Text>

        <Group wrap="nowrap" mt="md">
          <For each={Array(count()).fill(0)}>{(_, index) => <Badge>Badge {index()}</Badge>}</For>
        </Group>

        <Group mt="xl">
          <Button onClick={increment}>Add badge</Button>
          <Button onClick={decrement}>Remove badge</Button>
        </Group>
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}

export const sizeAuto: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
