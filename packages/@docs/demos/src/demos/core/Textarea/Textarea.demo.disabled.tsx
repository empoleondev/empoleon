import { Textarea } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Textarea } from '@empoleon/core';

function Demo() {
  return <Textarea label="Disabled" placeholder="Your comment" disabled />;
}
`;

function Demo() {
  return <Textarea label="Disabled" placeholder="Your comment" disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
