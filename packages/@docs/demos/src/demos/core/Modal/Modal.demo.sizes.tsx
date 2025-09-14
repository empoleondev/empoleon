import { Button, Group, Modal } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { AuthenticationForm } from '../../../shared/AuthenticationForm/AuthenticationForm';
import { createSignal } from 'solid-js';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '55rem', '70%', '100%'];

function Demo() {
  const [opened, setOpened] = createSignal(false);
  const [size, setSize] = createSignal<string | number>('md');

  const buttons = SIZES.map((s) => (
    <Button

      variant="default"
      onClick={() => {
        setSize(s);
        setOpened(true);
      }}
    >
      {s}
    </Button>
  ));

  return (
    <>
      <Modal
        opened={opened()}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        size={size()}
      >
        <AuthenticationForm noPadding noShadow />
      </Modal>

      <Group justify="center">{buttons}</Group>
    </>
  );
}

export const sizes: EmpoleonDemo = {
  type: 'code',
  component: Demo,
};
