import { Box, Container } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Box, Container } from '@empoleon/core';

function Demo() {
  return (
    <Container strategy="grid" size={500}>
      <Box bg="var(--empoleon-color-indigo-light)" h={50}>
        Main content
      </Box>

      <Box data-breakout bg="var(--empoleon-color-indigo-light)" mt="xs">
        <div>Breakout</div>

        <Box data-container bg="indigo" c="white" h={50}>
          <div>Container inside breakout</div>
        </Box>
      </Box>
    </Container>
  );
}
`;

function Demo() {
  return (
    <Container strategy="grid" size={500}>
      <Box bg="var(--empoleon-color-indigo-light)" h={50}>
        Main content
      </Box>

      <Box data-breakout bg="var(--empoleon-color-indigo-light)" mt="xs">
        <div>Breakout</div>

        <Box data-container bg="indigo" c="white" h={50}>
          <div>Container inside breakout</div>
        </Box>
      </Box>
    </Container>
  );
}

export const breakout: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
