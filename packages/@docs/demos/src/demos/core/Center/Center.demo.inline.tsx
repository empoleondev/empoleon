import { IconArrowLeft } from '@tabler/icons-react';
import { Anchor, Box, Center } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Center, Anchor, Box } from '@empoleon/core';
import { IconArrowLeft } from '@tabler/icons-react';

function Demo() {
  return (
    <Anchor href="https://mantine.dev" target="_blank">
      <Center inline>
        <IconArrowLeft size={12} />
        <Box ml={5}>Back to Mantine website</Box>
      </Center>
    </Anchor>
  );
}
`;

function Demo() {
  return (
    <Anchor href="https://mantine.dev" target="_blank">
      <Center inline>
        <IconArrowLeft size={12} className="mantine-rotate-rtl" />
        <Box ml={5}>Back to Mantine website</Box>
      </Center>
    </Anchor>
  );
}

export const inline: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
