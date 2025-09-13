import { Anchor } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Anchor } from '@empoleon/core';

function Demo() {
  return (
    <Anchor
      variant="gradient"
      gradient={{ from: 'pink', to: 'yellow' }}
      fw={500}
      fz="lg"
      href="#text-props"
    >
      A link with pink to yellow gradient
    </Anchor>
  );
}
`;

function Demo() {
  return (
    <Anchor
      variant="gradient"
      gradient={{ from: 'pink', to: 'yellow' }}
      fw={500}
      fz="lg"
      href="#text-props"
    >
      A link with pink to yellow gradient
    </Anchor>
  );
}

export const textProps: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
