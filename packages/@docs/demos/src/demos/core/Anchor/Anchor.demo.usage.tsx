import { Anchor } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Anchor } from '@empoleon/core';

function Demo() {
  return (
    <Anchor href="https://mantine.dev/" target="_blank">
      Anchor component
    </Anchor>
  );
}
`;

function Demo() {
  return (
    <Anchor href="https://mantine.dev/" target="_blank">
      Anchor component
    </Anchor>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
