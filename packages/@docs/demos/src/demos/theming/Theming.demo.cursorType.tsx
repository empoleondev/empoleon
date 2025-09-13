import { Checkbox, createTheme, EmpoleonThemeProvider } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { EmpoleonProvider, createTheme, Checkbox } from '@empoleon/core';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <>
      <Checkbox label="Default cursor" />

      <EmpoleonProvider theme={theme}>
        <Checkbox label="Pointer cursor" mt="md" />
      </EmpoleonProvider>
    </>
  );
}
`;

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <>
      <Checkbox label="Default cursor" />

      <EmpoleonThemeProvider theme={theme}>
        <Checkbox
          label="Pointer cursor"
          mt="md"
          styles={{ input: { cursor: 'pointer' }, label: { cursor: 'pointer' } }}
        />
      </EmpoleonThemeProvider>
    </>
  );
}

export const cursorType: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
