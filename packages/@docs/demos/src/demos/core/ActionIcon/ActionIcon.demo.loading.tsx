import { IconHeart } from '@tabler/icons-solidjs';
import { ActionIcon, Group, Switch } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { ActionIcon, Group, Switch } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { IconHeart } from '@tabler/icons-solidjs';

function Demo() {
  const [loading, { toggle }] = useDisclosure();
  return (
    <>
      <Group>
        <ActionIcon loading={loading}>
          <IconHeart size={18} stroke='1.5' />
        </ActionIcon>
        <ActionIcon variant="light" loading={loading}>
          <IconHeart size={18} stroke='1.5' />
        </ActionIcon>
        <ActionIcon variant="outline" loading={loading}>
          <IconHeart size={18} stroke='1.5' />
        </ActionIcon>
      </Group>

      <Switch checked={loading} onChange={toggle} label="Loading state" mt="md" />
    </>
  );
}
`;

function Demo() {
  const [loading, { toggle }] = useDisclosure();
  return (
    <>
      <Group>
        <ActionIcon loading={loading()}>
          <IconHeart size={18} stroke='1.5' />
        </ActionIcon>
        <ActionIcon variant="light" loading={loading()}>
          <IconHeart size={18} stroke='1.5' />
        </ActionIcon>
        <ActionIcon variant="outline" loading={loading()}>
          <IconHeart size={18} stroke='1.5' />
        </ActionIcon>
      </Group>

      <Switch checked={loading()} onChange={toggle} label="Loading state" mt="md" />
    </>
  );
}

export const loading: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
