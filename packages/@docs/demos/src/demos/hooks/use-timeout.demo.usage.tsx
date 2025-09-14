import { Button, Group, Text } from '@empoleon/core';
import { randomId, useTimeout } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { Button, Text, Group } from '@empoleon/core';
import { randomId, useTimeout } from '@empoleon/hooks';

function Demo() {
  const [value, setValue] = useState('');
  const { start, clear } = useTimeout(() => setValue(randomId()), 1000);

  return (
    <Group>
      <Button onClick={start}>Start</Button>
      <Button onClick={clear} color="red">
        Clear
      </Button>
      <Text>Random value: {value}</Text>
    </Group>
  );
}
`;

function Demo() {
  const [value, setValue] = createSignal('');
  const { start, clear } = useTimeout(() => setValue(randomId()), 1000);

  return (
    <Group>
      <Button onClick={start}>Start</Button>
      <Button onClick={clear} color="red">
        Clear
      </Button>
      <Text>Random value: {value()}</Text>
    </Group>
  );
}

export const useTimeoutDemo: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
