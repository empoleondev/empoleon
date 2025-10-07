import { For, JSX } from 'solid-js';
import { Button, EmpoleonProvider, Group } from '@empoleon/core';
import { Dropzone } from './index';

export default {
  title: 'Dropzone',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <Dropzone onDrop={(files) => console.log('accepted files', files)}>
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <div>
          <div>Drag and drop files</div>
        </div>
      </Group>
    </Dropzone>
  );
}

export function Loading() {
  return (
    <Dropzone loading onDrop={(files) => console.log('accepted files', files)}>
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <div>
          <div>Drag and drop files</div>
        </div>
      </Group>
    </Dropzone>
  );
}

export function NoClick() {
  return (
    <Dropzone activateOnClick={false} onDrop={(files) => console.log('accepted files', files)}>
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <div>
          <div>Drag and drop files</div>
        </div>
      </Group>
    </Dropzone>
  );
}

const lorem =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae esse eos error omnis eius nulla aperiam at inventore consequatur velit fuga sint pariatur, quisquam ut odit eligendi dolorum iste dolorem cupiditate? Facere tempora reprehenderit tenetur hic sapiente ullam non minus quod, maiores sed, veritatis repellat repudiandae recusandae corrupti alias aliquam?';

export function FullScreen() {
  return (
    <div style={{ height: '100vh', display: 'flex', 'flex-direction': 'column' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <For each={Array(10).fill(0)}>{(_) => <div style={{ padding: '20px' }}>{lorem}</div>}</For>
      </div>
      <Dropzone full-screen onDrop={(files) => console.log('accepted files', files)}>
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <div>
            <div>Drag and drop files</div>
          </div>
        </Group>
      </Dropzone>
    </div>
  );
}

export function EnableChildPointerEvent() {
  let openRef;

  return (
    <Dropzone openRef={openRef} onDrop={() => {}} activateOnClick={false}>
      <Group justify="center" bg="red">
        <Button onClick={() => openRef}>Select files</Button>
      </Group>
    </Dropzone>
  );
}
