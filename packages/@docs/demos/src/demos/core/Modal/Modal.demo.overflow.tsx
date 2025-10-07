import { For } from 'solid-js';
import { Button, Modal } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { For } from 'solid-js';
import { useDisclosure } from '@empoleon/hooks';
import { Modal, Button } from '@empoleon/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened()} onClose={close} title="Header is sticky">
        <For each={Array(100).fill(0)}>
          {() => <p>Modal with scroll</p>}
        </For>
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
`;

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened()} onClose={close} title="Header is sticky">
        <For each={Array(100).fill(0)}>{() => <p>Modal with scroll</p>}</For>
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}

export const overflow: EmpoleonDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
