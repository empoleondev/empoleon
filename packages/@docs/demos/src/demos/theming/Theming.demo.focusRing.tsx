import { Button, Code, Group, EmpoleonThemeProvider, Text } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

function Demo() {
  return (
    <>
      <Text>
        Focus ring: <Code>auto</Code>
      </Text>

      <Group mt="xs">
        <Button size="xs">Button 1</Button>
        <Button size="xs">Button 2</Button>
      </Group>

      <EmpoleonThemeProvider inherit theme={{ focusRing: 'always' }}>
        <Text mt="lg">
          Focus ring: <Code>always</Code>
        </Text>

        <Group mt="xs">
          <Button size="xs">Button 1</Button>
          <Button size="xs">Button 2</Button>
        </Group>
      </EmpoleonThemeProvider>

      <EmpoleonThemeProvider inherit theme={{ focusRing: 'never' }}>
        <Text mt="lg">
          Focus ring: <Code>never</Code>
        </Text>

        <Group mt="xs">
          <Button size="xs">Button 1</Button>
          <Button size="xs">Button 2</Button>
        </Group>
      </EmpoleonThemeProvider>
    </>
  );
}

export const focusRing: MantineDemo = {
  type: 'code',
  component: Demo,
};
