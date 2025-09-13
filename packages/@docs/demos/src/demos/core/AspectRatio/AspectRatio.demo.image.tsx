import { AspectRatio } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { AspectRatio } from '@empoleon/core';

function Demo() {
  return (
    <AspectRatio ratio={1080 / 720} maw={300} mx="auto">
      <img
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png"
        alt="Panda"
      />
    </AspectRatio>
  );
}
`;

function Demo() {
  return (
    <AspectRatio ratio={1080 / 720} maw={300} mx="auto">
      <img
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png"
        alt="Panda"
      />
    </AspectRatio>
  );
}

export const image: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
