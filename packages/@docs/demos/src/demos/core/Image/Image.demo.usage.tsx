import { Image } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Image } from '@empoleon/core';

function Demo() {
  return (
    <Image
      radius="md"
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
    />
  );
}
`;

function Demo() {
  return (
    <Image
      radius="md"
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
    />
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
