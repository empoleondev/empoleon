import { createSignal } from 'solid-js';
import { Button, RingProgress, Stack, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { Button, RingProgress, Stack, Text } from '@empoleon/core';

function Demo() {
  const [value, setValue] = useState(30);

  return (
    <Stack align="center">
      <RingProgress
        sections={[{ value, color: 'blue' }]}
        transitionDuration={250}
        label={<Text ta="center">{value}%</Text>}
      />

      <Button onClick={() => setValue(Math.floor(Math.random() * 100))}>Set random value</Button>
    </Stack>
  );
}
`;

function Demo() {
  const [value, setValue] = createSignal(30);

  return (
    <Stack align="center">
      <RingProgress
        sections={[{ value: value(), color: 'blue' }]}
        transitionDuration={250}
        label={<Text ta="center">{value()}%</Text>}
      />

      <Button onClick={() => setValue(Math.floor(Math.random() * 100))}>Set random value</Button>
    </Stack>
  );
}

export const transitions: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
