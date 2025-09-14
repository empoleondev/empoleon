import { Anchor, Avatar, Group, HoverCard, Stack, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { JSX } from 'solid-js';

const code = `
import { HoverCard, Avatar, Text, Group, Anchor, Stack } from '@empoleon/core';

function Demo() {
  return (
    <Group justify="center">
      <HoverCard width={320} shadow="md" withArrow openDelay={200} closeDelay={400}>
        <HoverCard.Target>
          <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group>
            <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
            <Stack gap={5}>
              <Text size="sm" fw={700} style={{ lineHeight: 1 }}>
                Mantine
              </Text>
              <Anchor
                href="https://x.com/mantinedev"
                c="dimmed"
                size="xs"
                style={{ lineHeight: 1 }}
              >
                @empoleondev
              </Anchor>
            </Stack>
          </Group>

          <Text size="sm" mt="md">
            Customizable React components and hooks library with focus on usability, accessibility
            and developer experience
          </Text>

          <Group mt="md" gap="xl">
            <Text size="sm">
              <b>0</b> Following
            </Text>
            <Text size="sm">
              <b>1,174</b> Followers
            </Text>
          </Group>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
`;

export function HoverCardHomePageDemo({ children }: { children: JSX.Element }) {
  return (
    <HoverCard width='320px' shadow="md" withArrow openDelay={200} closeDelay={400}>
      <HoverCard.Target>{children}</HoverCard.Target>
      <HoverCard.Dropdown>
        <Group>
          <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
          <Stack gap={5}>
            <Text size="sm" fw={700} style={{ lineHeight: 1 }}>
              Mantine
            </Text>
            <Anchor href="https://x.com/mantinedev" c="dimmed" size="xs" style={{ lineHeight: 1 }}>
              @empoleondev
            </Anchor>
          </Stack>
        </Group>

        <Text size="sm" mt="md">
          Customizable React components and hooks library with focus on usability, accessibility and
          developer experience
        </Text>

        <Group mt="md" gap="xl">
          <Text size="sm">
            <b>0</b> Following
          </Text>
          <Text size="sm">
            <b>1,174</b> Followers
          </Text>
        </Group>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}

function Demo() {
  return (
    <Group justify="center">
      <HoverCardHomePageDemo>
        <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
      </HoverCardHomePageDemo>
    </Group>
  );
}

export const profile: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
