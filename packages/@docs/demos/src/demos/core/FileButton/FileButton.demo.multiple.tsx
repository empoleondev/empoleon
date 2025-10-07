import { Button, FileButton, Group, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, For, Show } from 'solid-js';

const code = `
import { createSignal, For, Show } from 'solid-js';
import { FileButton, Button, Group, Text } from '@empoleon/core';

function Demo() {
  const [files, setFiles] = createSignal<File[]>([]);
  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      <Show when={files().length > 0}>
        <Text size="sm" mt="sm">
          Picked files:
        </Text>
      </Show>

      <ul>
        <For each={files()}>
          {(file) => <li>{file.name}</li>}
        </For>
      </ul>
    </>
  );
}
`;

function Demo() {
  const [files, setFiles] = createSignal<File[]>([]);
  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      <Show when={files().length > 0}>
        <Text size="sm" mt="sm">
          Picked files:
        </Text>
      </Show>

      <ul>
        <For each={files()}>
          {(file) => <li>{file.name}</li>}
        </For>
      </ul>
    </>
  );
}

export const multiple: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
