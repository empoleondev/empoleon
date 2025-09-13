import { Avatar, Button, Indicator, Stack } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { useDisclosure } from '@empoleon/hooks';
import { Avatar, Indicator, Button, Stack } from '@empoleon/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure();

  return (
    <Stack align="center">
      <Indicator inline disabled={!visible} color="red" size={12}>
        <Avatar
          size="lg"
          radius="sm"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png"
        />
      </Indicator>
      <Button onClick={toggle}>Toggle indicator</Button>
    </Stack>
  );
}
`;

function Demo() {
  const [visible, { toggle }] = useDisclosure();

  return (
    <Stack align="center">
      <Indicator inline disabled={!visible} color="red" size={12}>
        <Avatar
          size="lg"
          radius="sm"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png"
        />
      </Indicator>
      <Button onClick={toggle}>Toggle indicator</Button>
    </Stack>
  );
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
