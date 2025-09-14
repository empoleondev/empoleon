import { Button, Group } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Group, Button, EmpoleonProvider, createTheme } from '@empoleon/core';

const theme = createTheme({
  primaryColor: 'bright-pink',
  colors: {
    'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
  },
});

function Demo() {
  return (
    <EmpoleonProvider theme={theme}>
      <Group>
        <Button>Primary button</Button>
        <Button color="blue">Blue button</Button>
      </Group>
    </EmpoleonProvider>
  );
}

`;

function Demo() {
  return (
    <Group>
      <Button color="bright-pink">Primary button</Button>
      <Button color="blue">Blue button</Button>
    </Group>
  );
}

export const primaryColor: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
