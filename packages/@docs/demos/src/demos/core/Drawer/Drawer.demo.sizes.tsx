import { createSignal, For } from 'solid-js';
import { Button, Drawer, Group } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Demo() {
  const [opened, setOpened] = createSignal(false);
  const [size, setSize] = createSignal<number | string>('top');
  const open = (s: typeof size) => {
    setSize(s());
    setOpened(true);
  };

  return (
    <>
      <Drawer
        opened={opened()}
        onClose={() => setOpened(false)}
        padding="md"
        size={size()}
        withCloseButton={false}
      >
        Press escape to close the drawer
      </Drawer>

      <Group justify="center">
        <For each={['xs', 'sm', 'md', 'lg', 'xl', '100%', '40rem', '25%'] as const}>
          {(s) => (
            <Button variant="default" onClick={() => open(() => s)}>
              {s}
            </Button>
          )}
        </For>
      </Group>
    </>
  );
}

export const sizes: EmpoleonDemo = {
  type: 'code',
  component: Demo,
};
