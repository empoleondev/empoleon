import { Button, Group, useEmpoleonColorScheme } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useEmpoleonColorScheme, Button, Group } from '@empoleon/core';

function Demo() {
  const { setColorScheme, clearColorScheme } = useEmpoleonColorScheme();

  return (
    <Group>
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
      <Button onClick={clearColorScheme}>Clear</Button>
    </Group>
  );
}
`;

function Demo() {
  const { setColorScheme, clearColorScheme } = useEmpoleonColorScheme();
  return (
    <Group>
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
      <Button onClick={clearColorScheme}>Clear</Button>
    </Group>
  );
}

export const colorScheme: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
