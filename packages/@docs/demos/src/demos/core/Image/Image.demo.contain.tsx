import { Image } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Image } from '@empoleon/core';

function Demo() {
  return (
    <Image
      radius="md"
      h={200}
      w="auto"
      fit="contain"
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
    />
  );
}
`;

function Demo() {
  return (
    <Image
      radius="md"
      h={200}
      w="auto"
      fit="contain"
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
    />
  );
}

export const contain: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
