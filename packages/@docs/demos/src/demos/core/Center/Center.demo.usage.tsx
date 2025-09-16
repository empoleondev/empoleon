import { Box, Center } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Center, Box } from '@empoleon/core';

function Demo() {
  return (
    <Center maw={400} h={100} bg="var(--empoleon-color-gray-light)">
      <Box bg="var(--empoleon-color-blue-light)">All elements inside Center are centered</Box>
    </Center>
  );
}
`;

function Demo() {
  return (
    <Center maw={400} h={100} bg="var(--empoleon-color-gray-light)">
      <Box bg="var(--empoleon-color-blue-light)">All elements inside Center are centered</Box>
    </Center>
  );
}

export const usage: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
