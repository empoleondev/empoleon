import { Button, Stack, Text } from '@empoleon/core';
import { useInterval } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';
import { createEffect, createSignal } from 'solid-js';

const code = `
import { useState, useEffect } from 'react';
import { useInterval } from '@empoleon/hooks';
import { Stack, Button, Text } from '@empoleon/core';

function Demo() {
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <Stack align="center">
      <Text>Page loaded <b>{seconds}</b> seconds ago</Text>
      <Button onClick={interval.toggle} color={interval.active ? 'red' : 'teal'}>
        {interval.active ? 'Stop' : 'Start'} counting
      </Button>
    </Stack>
  );
}
`;

function Demo() {
  const [seconds, setSeconds] = createSignal(0);
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  createEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <Stack align="center">
      <Text>
        Page loaded <b>{seconds()}</b> seconds ago
      </Text>
      <Button onClick={interval.toggle} color={interval.active() ? 'red' : 'teal'}>
        {interval.active() ? 'Stop' : 'Start'} counting
      </Button>
    </Stack>
  );
}

export const useIntervalDemo: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
