import { Button, Group } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button, Group } from '@empoleon/core';

function Demo() {
  return (
    <Group>
      <Button color="lime.4">Default</Button>
      <Button color="lime.4" autoContrast>
        Auto contrast
      </Button>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <Button color="lime.4">Default</Button>
      <Button color="lime.4" autoContrast>
        Auto contrast
      </Button>
    </Group>
  );
}

export const autoContrast: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
