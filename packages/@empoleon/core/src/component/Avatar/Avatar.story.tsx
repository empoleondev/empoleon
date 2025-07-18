import { For, JSX } from 'solid-js';
import { Box, EmpoleonProvider } from '../../core';
import { Center } from '../Center';
import { Group } from '../Group';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';
import { Avatar } from './Avatar';

export default {
  title: 'Avatar',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Avatar>AN</Avatar>
      <Avatar src="https://raw.githubusercontent.com/empoleondev/empoleon/master/.demo/avatars/avatar-7.png">
        AN
      </Avatar>
    </div>
  );
}

export function InitialsColor() {
  const names = [
    'John Doe',
    'Jane Mol',
    'Alex Lump',
    'Sarah Condor',
    'Mike Johnson',
    'Kate Kok',
    'Tom Smith',
  ];

  return <div style={{ 'padding': '40px', display: 'flex', 'gap': '10px' }}>
    <For each={names}>
      {(name) => (
        <Avatar name={name} color="initials" />
      )}
    </For>
  </div>;
}

export function AutoContrast() {
  const buttons = Array.from({ length: 10 }, (_, i) => `red.${i}`);

  return (
    <div
      style={{
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'flex-start',
        'gap': '10px',
        'padding': '40px',
      }}
    >
      <For each={buttons}>
        {(color) => (
          <Avatar variant="filled" color={color} autoContrast>
            $$
          </Avatar>
        )}
      </For>
    </div>
  );
}

export function CustomComponent() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Avatar component="a" href="https://empoleon.dev">
        AN
      </Avatar>
      <Avatar component="button" type="button">
        BU
      </Avatar>
    </div>
  );
}

export function AvatarGroup() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Avatar.Group>
        <Tooltip label="Hello">
          <Avatar radius="xl" color="blue">
            AN
          </Avatar>
        </Tooltip>
        <Tooltip label="Hello">
          <Avatar radius="xl" color="red">
            BU
          </Avatar>
        </Tooltip>
        <Avatar radius="xl">+3</Avatar>
      </Avatar.Group>
    </div>
  );
}

export function Variants() {
  const variants = [
    'filled',
    'light',
    'white',
    'default',
    'gradient',
    'outline',
  ];

  return (
    <div style={{ 'padding': '40px' }}>
      <Stack>
        <Group>
          <For each={variants}>
            {(variant) => (
              <Avatar variant={variant} color="blue" radius="md">
                ZH
              </Avatar>
            )}
          </For>
        </Group>

        <Group>
          <For each={variants}>
            {(variant) => (
              <Avatar variant={variant} color="blue" radius="xl" />
            )}
          </For>
        </Group>

        <Group>
          <For each={variants}>
            {(variant) => (
              <Avatar
                variant={variant}
                color="blue"
                radius="xl"
                src="https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4"
              />
            )}
          </For>
        </Group>
      </Stack>
    </div>
  );
}

export function Gradient() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Group>
        <Box>
          <Text>Default</Text>
          <Center>
            <Avatar variant="gradient" radius="md">
              ZH
            </Avatar>
          </Center>
        </Box>

        <Box>
          <Text>Specific</Text>
          <Center>
            <Avatar variant="gradient" gradient={{ from: 'orange', to: 'red' }} radius="md">
              ZH
            </Avatar>
          </Center>
        </Box>
      </Group>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Group>
        <Avatar
          unstyled
          src="https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4"
        />
        <Avatar unstyled>MX</Avatar>
      </Group>
    </div>
  );
}
