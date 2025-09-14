import { Button, Group } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { BaseDemo } from './_base';
import { createSignal } from 'solid-js';

const code = `
import { useRef } from 'react';
import { Button, Group } from '@empoleon/core';
import { Dropzone } from '@empoleon/dropzone';

function Demo() {
  const openRef = useRef<() => void>(null);

  return (
    <>
      <Dropzone openRef={openRef} onDrop={() => {}}>
        {/* children */}
      </Dropzone>

      <Group justify="center" mt="md">
        <Button onClick={() => openRef.current?.()}>Select files</Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const [openRef, setOpenRef] = createSignal<(() => void) | undefined>();

  return (
    <>
      <BaseDemo openRef={setOpenRef} />
      <Group justify="center" mt="md">
        <Button onClick={() => openRef?.()}>Select files</Button>
      </Group>
    </>
  );
}

export const manual: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
