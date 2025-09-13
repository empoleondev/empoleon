import { Button, Group } from '@empoleon/core';
import { Dropzone } from '@empoleon/dropzone';
import { MantineDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useRef } from 'react';
import { Button, Group } from '@empoleon/core';
import { Dropzone } from '@empoleon/dropzone';

function Demo() {
  const openRef = useRef<() => void>(null);

  return (
    <Dropzone openRef={openRef} onDrop={() => {}} activateOnClick={false}>
      <Group justify="center">
        <Button onClick={() => openRef.current?.()} style={{ pointerEvents: 'all' }}>
          Select files
        </Button>
      </Group>
    </Dropzone>
  );
}
`;

function Demo() {
  const [openRef, setOpenRef] = createSignal<(() => void) | undefined>();

  return (
    <Dropzone openRef={setOpenRef} onDrop={() => {}} activateOnClick={false}>
      <Group justify="center">
        <Button onClick={() => openRef?.()} style={{ pointerEvents: 'all' }}>
          Select files
        </Button>
      </Group>
    </Dropzone>
  );
}

export const enableChildPointerEvent: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
