import { createSignal } from 'solid-js';
import { Button, Drawer, Group } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Demo() {
  const [opened, setOpened] = createSignal(false);
  const [position, setPosition] = createSignal<'top' | 'left' | 'right' | 'bottom'>('top');
  const open = (p: 'top' | 'left' | 'right' | 'bottom') => {
    setPosition(p);
    setOpened(true);
  };

  return (
    <>
      <Drawer
        opened={opened()}
        onClose={() => setOpened(false)}
        padding="md"
        position={position()}
        withCloseButton={false}
      >
        Press escape to close the drawer
      </Drawer>

      <Group justify="center">
        <Button variant="default" onClick={() => open('left')}>
          Left
        </Button>
        <Button variant="default" onClick={() => open('right')}>
          Right
        </Button>
        <Button variant="default" onClick={() => open('top')}>
          Top
        </Button>
        <Button variant="default" onClick={() => open('bottom')}>
          Bottom
        </Button>
      </Group>
    </>
  );
}

export const positions: EmpoleonDemo = {
  type: 'code',
  component: Demo,
};
