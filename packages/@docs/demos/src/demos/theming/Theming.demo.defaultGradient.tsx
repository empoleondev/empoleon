import { Button, createTheme, EmpoleonThemeProvider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { EmpoleonProvider, createTheme, Button } from '@empoleon/core';

const theme = createTheme({
  defaultGradient: {
    from: 'orange',
    to: 'red',
    deg: 45,
  },
});

function Demo() {
  return (
    <EmpoleonProvider theme={theme}>
      <Button variant="gradient">Button with custom default gradient</Button>
    </EmpoleonProvider>
  );
}
`;

const theme = createTheme({
  defaultGradient: {
    from: 'orange',
    to: 'red',
    deg: 45,
  },
});

function Demo() {
  return (
    <EmpoleonThemeProvider theme={theme}>
      <Button variant="gradient">Button with custom default gradient</Button>
    </EmpoleonThemeProvider>
  );
}

export const defaultGradient: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
