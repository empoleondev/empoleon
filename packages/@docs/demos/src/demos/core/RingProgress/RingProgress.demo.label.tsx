import { IconCheck } from '@tabler/icons-solidjs';
import { ActionIcon, Center, Group, RingProgress, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { ActionIcon, RingProgress, Text, Center } from '@empoleon/core';
import { IconCheck } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <>
      <RingProgress
        sections={[{ value: 40, color: 'blue' }]}
        label={
          <Text c="blue" fw={700} ta="center" size="xl">
            40%
          </Text>
        }
      />

      <RingProgress
        sections={[{ value: 100, color: 'teal' }]}
        label={
          <Center>
            <ActionIcon color="teal" variant="light" radius="xl" size="xl">
              <IconCheck size={22} />
            </ActionIcon>
          </Center>
        }
      />
    </>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <RingProgress
        sections={[{ value: 40, color: 'blue' }]}
        label={
          <Text c="blue" fw={700} ta="center" size="xl">
            40%
          </Text>
        }
      />

      <RingProgress
        sections={[{ value: 100, color: 'teal' }]}
        label={
          <Center>
            <ActionIcon color="teal" variant="light" radius="xl" size="xl">
              <IconCheck size={22} />
            </ActionIcon>
          </Center>
        }
      />
    </Group>
  );
}

export const label: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
