import { createSignal, Show } from 'solid-js';
import { Button, FileButton, Group, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createSignal, Show } from 'solid-js';
import { FileButton, Button, Group, Text } from '@empoleon/core';

function Demo() {
  const [file, setFile] = createSignal<File | null>(null);
  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      <Show when={file()}>
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file()?.name}
        </Text>
      </Show>
    </>
  );
}
`;

function Demo() {
  const [file, setFile] = createSignal<File | null>(null);
  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      <Show when={file()}>
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file()?.name}
        </Text>
      </Show>
    </>
  );
}

export const usage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
