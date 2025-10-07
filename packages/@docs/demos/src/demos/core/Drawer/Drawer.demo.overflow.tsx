import { Button, Drawer } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { For } from 'solid-js';

const code = `
import { For } from 'solid-js';
import { useDisclosure } from '@empoleon/hooks';
import { Drawer, Button } from '@empoleon/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened()} onClose={close} title="Header is sticky">
        <For each={Array(100).fill(0)}>
          {() => <p>Drawer with scroll</p>}
        </For>
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
`;

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened()} onClose={close} title="Header is sticky">
        <For each={Array(100).fill(0)}>
          {() => <p>Drawer with scroll</p>}
        </For>
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
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
