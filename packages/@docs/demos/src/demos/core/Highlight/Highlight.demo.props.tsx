import { Highlight } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Highlight } from '@empoleon/core';

function Demo() {
  return (
    <Highlight
      component="a"
      href="https://mantine.dev"
      target="_blank"
      highlight="mantine"
      fw={500}
      c="var(--empoleon-color-anchor)"
    >
      Mantine website
    </Highlight>
  );
}

`;

function Demo() {
  return (
    <Highlight
      component="a"
      href="https://mantine.dev"
      target="_blank"
      highlight="mantine"
      fw={500}
      c="var(--empoleon-color-anchor)"
    >
      Mantine website
    </Highlight>
  );
}

export const props: EmpoleonDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
