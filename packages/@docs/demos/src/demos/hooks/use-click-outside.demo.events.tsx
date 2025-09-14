import { Button, Group, Paper } from '@empoleon/core';
import { useClickOutside } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { Paper, Button } from '@empoleon/core';
import { useClickOutside } from '@empoleon/hooks';

function Demo() {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false), ['mouseup', 'touchend']);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open dropdown</Button>

      {opened && (
        <Paper ref={ref} shadow="sm">
          <span>Click outside to close</span>
        </Paper>
      )}
    </>
  );
}
`;

function Demo() {
  const [opened, setOpened] = createSignal(false);
  const ref = useClickOutside(() => setOpened(false), ['mouseup', 'touchend']);

  return (
    <div style={{ position: 'relative' }}>
      <Group justify="center">
        <Button onClick={() => setOpened(true)}>Open dropdown</Button>
      </Group>

      {opened() && (
        <Paper
          ref={ref}
          shadow="sm"
          style={{
            width: '300px',
            height: '60px',
            position: 'absolute',
            top: 0,
            left: 'calc(50% - 150px)',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            zIndex: 1,
          }}
        >
          <span>Click outside to close</span>
        </Paper>
      )}
    </div>
  );
}

export const useClickOutsideEvents: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  dimmed: true,
};
