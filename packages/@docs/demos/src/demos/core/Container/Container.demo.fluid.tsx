import { Container } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Container } from '@empoleon/core';

function Demo() {
  return (
    <Container fluid h={50} bg="var(--mantine-color-blue-light)">
      Fluid container has 100% max-width
    </Container>
  );
}
`;

function Demo() {
  return (
    <Container fluid h={50} bg="var(--mantine-color-blue-light)">
      Fluid container has 100% max-width
    </Container>
  );
}

export const fluid: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
