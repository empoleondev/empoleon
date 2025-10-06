import { Button, Group, List } from '@empoleon/core';
import { useFileDialog } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createMemo, For, Show } from 'solid-js';

const code = `
import { Button, Group, List } from '@empoleon/core';
import { useFileDialog } from '@empoleon/hooks';

function Demo() {
  const fileDialog = useFileDialog();

  const pickedFiles = Array.from(fileDialog.files || []).map((file) => (
    <List.Item >{file.name}</List.Item>
  ));

  return (
    <div>
      <Group>
        <Button onClick={fileDialog.open}>Pick files</Button>
        {pickedFiles.length > 0 && (
          <Button variant="default" onClick={fileDialog.reset}>
            Reset
          </Button>
        )}
      </Group>
      {pickedFiles.length > 0 && <List mt="lg">{pickedFiles}</List>}
    </div>
  );
}
`;

function Demo() {
  const fileDialog = useFileDialog();

  const pickedFiles = createMemo(() => Array.from(fileDialog.files() || []));

  return (
    <div>
      <Group>
        <Button onClick={fileDialog.open}>Pick files</Button>
        <Show when={pickedFiles().length}>
          <Button variant="default" onClick={fileDialog.reset}>
            Reset
          </Button>
        </Show>
      </Group>
      <Show when={pickedFiles().length}>
        <List mt="lg">
          <For each={pickedFiles()}>
            {(file) => <List.Item>{file.name}</List.Item>}
          </For>
        </List>
      </Show>
    </div>
  );
}

export const useFileDialogUsage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
