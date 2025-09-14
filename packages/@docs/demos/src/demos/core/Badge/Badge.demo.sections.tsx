import { IconAt } from '@tabler/icons-solidjs';
import { Badge, Group } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Badge, Group } from '@empoleon/core';
import { IconAt } from '@tabler/icons-solidjs';

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

export const sections: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
