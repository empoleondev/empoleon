import { Button, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { createSignal } from 'solid-js';
import { Tooltip, Button } from '@empoleon/core';

function Demo() {
  const [opened, setOpened] = createSignal(true);

  return (
    <Tooltip label="Ctrl + J" opened={opened()}>
      <Button onClick={() => setOpened((o) => !o)}>
        Toggle color scheme
      </Button>
    </Tooltip>
  );
}`;

export function Demo() {
  const [opened, setOpened] = createSignal(false);

  return (
    <Tooltip label="Ctrl + J" opened={opened()}>
      {(props) => <Button {...props} onClick={() => setOpened((o) => !o)}>Toggle color scheme</Button>}
    </Tooltip>
  );
}

export const controlled: EmpoleonDemo = {
  type: 'code',
  centered: true,
  code,
  component: Demo,
};
