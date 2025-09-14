import { Button, createTheme, Group, EmpoleonThemeProvider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { EmpoleonProvider, Button, Group, createTheme } from '@empoleon/core';

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'cyan',
        variant: 'outline',
      },
    }),
  },
});

function Demo() {
  return (
    <EmpoleonProvider theme={theme}>
      <Group>
        <Button>Default button</Button>
        <Button color="red" variant="filled">
          Button with props
        </Button>
      </Group>
    </EmpoleonProvider>
  );
}
`;

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'cyan',
        variant: 'outline',
      },
    }),
  },
});

function Demo() {
  return (
    <EmpoleonThemeProvider theme={theme}>
      <Group>
        <Button>Default button</Button>
        <Button color="red" variant="filled">
          Button with props
        </Button>
      </Group>
    </EmpoleonThemeProvider>
  );
}

export const defaultProps: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
