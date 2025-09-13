import { Anchor, Group } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Anchor, Group } from '@empoleon/core';

function Demo() {
  return (
    <Group justify="center">
      <Anchor href="https://mantine.dev/" target="_blank" underline="always">
        Underline always
      </Anchor>
      <Anchor href="https://mantine.dev/" target="_blank" underline="hover">
        Underline hover
      </Anchor>
      <Anchor href="https://mantine.dev/" target="_blank" underline="never">
        Underline never
      </Anchor>
      <Anchor href="https://mantine.dev/" target="_blank" underline="not-hover">
        Underline not-hover
      </Anchor>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <Anchor href="https://mantine.dev/" target="_blank" underline="always">
        Underline always
      </Anchor>
      <Anchor href="https://mantine.dev/" target="_blank" underline="hover">
        Underline hover
      </Anchor>
      <Anchor href="https://mantine.dev/" target="_blank" underline="never">
        Underline never
      </Anchor>
      <Anchor href="https://mantine.dev/" target="_blank" underline="not-hover">
        Underline not-hover
      </Anchor>
    </Group>
  );
}

export const decoration: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
