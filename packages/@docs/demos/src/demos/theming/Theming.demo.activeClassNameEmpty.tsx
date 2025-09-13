import { Button, EmpoleonThemeProvider } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { EmpoleonProvider, Button } from '@empoleon/core';

function Demo() {
  return (
    <EmpoleonProvider theme={{ activeClassName: '' }}>
      <Button>No active styles</Button>
    </EmpoleonProvider>
  );
}
`;

function Demo() {
  return (
    <EmpoleonThemeProvider theme={{ activeClassName: '' }}>
      <Button>No active styles</Button>
    </EmpoleonThemeProvider>
  );
}

export const activeClassNameEmpty: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
