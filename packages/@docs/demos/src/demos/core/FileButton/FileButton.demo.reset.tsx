import { createSignal, Show } from 'solid-js';
import { Button, FileButton, Group, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createSignal, Show } from 'solid-js';
import { FileButton, Button, Group, Text } from '@empoleon/core';

function Demo() {
  const [file, setFile] = createSignal<File | null>(null);
  const [resetRef, setResetRef] = createSignal<(() => void) | null>(null);

  const clearFile = () => {
    setFile(null);
    resetRef();
  };

  return (
    <>
      <Group justify="center">
        <FileButton resetRef={setResetRef} onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
        <Button disabled={!file} color="red" onClick={clearFile}>
          Reset
        </Button>
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
  const [resetRef, setResetRef] = createSignal<(() => void) | null>(null);

  const clearFile = () => {
    setFile(null);
    resetRef();
  };

  return (
    <>
      <Group justify="center">
        <FileButton resetRef={setResetRef} onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
        <Button disabled={!file} color="red" onClick={clearFile}>
          Reset
        </Button>
      </Group>

      <Show when={file()}>
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file()?.name}
        </Text>
      </Show>
    </>
  );
}

export const reset: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
