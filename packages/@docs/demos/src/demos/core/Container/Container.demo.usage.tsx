import { Container } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Container } from '@empoleon/core';

function Demo() {
  const demoProps = {
    bg: 'var(--empoleon-color-blue-light)',
    h: 50,
    mt: 'md',
  };

  return (
    <>
      <Container {...demoProps}>Default Container</Container>

      <Container size="xs" {...demoProps}>
        xs Container
      </Container>

      <Container px={0} size={480} {...demoProps}>
        480px Container without padding
      </Container>
    </>
  );
}
`;

function Demo() {
  const demoProps = {
    bg: 'var(--empoleon-color-blue-light)',
    h: 50,
    mt: 'md',
  };

  return (
    <>
      <Container {...demoProps} mt={0}>
        Default Container
      </Container>
      <Container size="xs" {...demoProps}>
        xs Container
      </Container>
      <Container px={0} size={480} {...demoProps}>
        480px Container without padding
      </Container>
    </>
  );
}

export const usage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
