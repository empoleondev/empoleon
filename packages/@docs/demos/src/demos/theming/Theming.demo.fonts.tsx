import { Button, Code, Group, Title } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button, Code, Title, EmpoleonProvider, createTheme } from '@empoleon/core';

const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Outfit, sans-serif' },
});

function Demo() {
  return (
    <EmpoleonProvider theme={theme}>
      <Title order={3}>Outfit or sans-serif title</Title>
      <Button>Verdana button</Button>
      <Code>Monaco, Courier Code</Code>
    </EmpoleonProvider>
  );
}
`;

function Demo() {
  return (
    <>
      <Title order={3} ff="Outfit, sans-serif" ta="center">
        Outfit or sans-serif title
      </Title>
      <Group mt="md">
        <Button ff="Verdana, sans-serif">Verdana button</Button>
        <Code ff="Monaco, Courier, monospace">Monaco, Courier Code</Code>
      </Group>
    </>
  );
}

export const fonts: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
