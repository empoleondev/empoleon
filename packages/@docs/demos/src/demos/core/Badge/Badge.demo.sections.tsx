import { IconAt } from '@tabler/icons-react';
import { Badge, Group } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Badge, Group } from '@empoleon/core';
import { IconAt } from '@tabler/icons-react';

function Demo() {
  const icon = <IconAt size={12} />;
  return (
    <Group>
      <Badge leftSection={icon}>With left section</Badge>
      <Badge rightSection={icon}>With right section</Badge>
    </Group>
  );
}
`;

function Demo() {
  const icon = <IconAt size={12} />;
  return (
    <Group>
      <Badge leftSection={icon}>With left section</Badge>
      <Badge rightSection={icon}>With right section</Badge>
    </Group>
  );
}

export const sections: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
