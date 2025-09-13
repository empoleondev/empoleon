import { Button, Group, List } from '@empoleon/core';
import { useFileDialog } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button, Group, List } from '@empoleon/core';
import { useFileDialog } from '@empoleon/hooks';

function Demo() {
  const fileDialog = useFileDialog();

  const pickedFiles = Array.from(fileDialog.files || []).map((file) => (
    <List.Item key={file.name}>{file.name}</List.Item>
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

  const pickedFiles = Array.from(fileDialog.files() || []).map((file) => (
    <List.Item>{file.name}</List.Item>
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

export const useFileDialogUsage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
