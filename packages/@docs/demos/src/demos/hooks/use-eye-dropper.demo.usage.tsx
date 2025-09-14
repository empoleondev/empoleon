import { IconViewfinder } from '@tabler/icons-solidjs';
import { ActionIcon, ColorSwatch, Group, Text } from '@empoleon/core';
import { useEyeDropper } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { ActionIcon, Group, ColorSwatch, Text } from '@empoleon/core';
import { IconColorPicker } from '@tabler/icons-solidjs';
import { useEyeDropper } from '@empoleon/hooks';

function Demo() {
  const [color, setColor] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const { supported, open } = useEyeDropper();

  const pickColor = async () => {
    try {
      const { sRGBHex } = (await open())!;
      setColor(sRGBHex);
    } catch (e) {
      setError(e as Error);
    }
  };

  if (!supported) {
    return <Text ta="center">EyeDropper API is not supported in your browser</Text>;
  }

  return (
    <Group>
      <ActionIcon variant="default" onClick={pickColor} size="xl" radius="md">
        <IconViewfinder size={28} stroke='1.5' />
      </ActionIcon>
      {color ? (
        <Group gap="xs">
          <ColorSwatch color={color} />
          <Text>Picked color: {color}</Text>
        </Group>
      ) : (
        <Text>Click the button to pick color</Text>
      )}
      {error && <Text c="red">Error: {error?.message}</Text>}
    </Group>
  );
}
`;

function Demo() {
  const [color, setColor] = createSignal('');
  const [error, setError] = createSignal<Error | null>(null);
  const { supported, open } = useEyeDropper();

  const pickColor = async () => {
    try {
      const { sRGBHex } = (await open())!;
      setColor(sRGBHex);
    } catch (e) {
      setError(e as Error);
    }
  };

  if (!supported) {
    return <Text ta="center">EyeDropper API is not supported in your browser</Text>;
  }

  return (
    <Group>
      <ActionIcon variant="default" onClick={pickColor} size="xl" radius="md">
        <IconViewfinder size={28} stroke='1.5' />
      </ActionIcon>
      {color ? (
        <Group gap="xs">
          <ColorSwatch color={color()} />
          <Text>Picked color: {color()}</Text>
        </Group>
      ) : (
        <Text>Click the button to pick color</Text>
      )}
      {error && <Text c="red">Error: {error()?.message}</Text>}
    </Group>
  );
}

export const useEyeDropperUsage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
