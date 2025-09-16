import { Container } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Container } from '@empoleon/core';

function Demo() {
  return (
    <Container fluid h={50} bg="var(--empoleon-color-blue-light)">
      Fluid container has 100% max-width
    </Container>
  );
}
`;

function Demo() {
  return (
    <Container fluid h={50} bg="var(--empoleon-color-blue-light)">
      Fluid container has 100% max-width
    </Container>
  );
}

export const fluid: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
