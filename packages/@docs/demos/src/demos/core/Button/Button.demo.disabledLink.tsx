import { Button } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';

function Demo() {
  return (
    <Button
      component="a"
      href="https://mantine.dev"
      data-disabled
      onClick={(event) => event.preventDefault()}
    >
      Disabled link
    </Button>
  );
}
`;

function Demo() {
  return (
    <Button
      component="a"
      href="https://mantine.dev"
      data-disabled
      onClick={(event) => event.preventDefault()}
    >
      Disabled link
    </Button>
  );
}

export const disabledLink: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
