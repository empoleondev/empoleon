import { Textarea } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Textarea } from '@empoleon/core';

function Demo() {
  return <Textarea resize="vertical" label="Disabled" placeholder="Your comment" />;
}
`;

function Demo() {
  return <Textarea resize="vertical" label="Disabled" placeholder="Your comment" />;
}

export const resize: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
