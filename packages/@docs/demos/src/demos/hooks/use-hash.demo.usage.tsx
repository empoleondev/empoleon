import { Button, Code, Group, Text } from '@empoleon/core';
import { randomId, useHash } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { useHash, randomId } from '@empoleon/hooks';
import { Button, Text, Code } from '@empoleon/core';

function Demo() {
  const [hash, setHash] = useHash();
  return (
    <>
      <Button onClick={() => setHash(randomId())}>Set hash to random string</Button>
      <Text>Current hash: <Code>{hash}</Code></Text>
    </>
  );
}`;

function Demo() {
  const [hash, setHash] = useHash();

  return (
    <>
      <Group justify="center">
        <Button onClick={() => setHash(randomId())}>Set hash to random string</Button>
      </Group>

      <Text ta="center" mt="md">
        Current hash: <Code>{hash()}</Code>
      </Text>
    </>
  );
}

export const useHashDemo: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
