import { Button, Code, Group, Text } from '@empoleon/core';
import { useStateHistory } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Button, Code, Group, Text } from '@empoleon/core';
import { useStateHistory } from '@empoleon/hooks';

function Demo() {
  const [value, handlers, history] = useStateHistory(1);
  return (
    <>
      <Text>Current value: {value}</Text>
      <Group my="md">
        <Button onClick={() => handlers.set(Math.ceil(Math.random() * 100) + 1)}>Set value</Button>
        <Button onClick={() => handlers.back()}>Back</Button>
        <Button onClick={() => handlers.forward()}>Forward</Button>
        <Button onClick={() => handlers.reset()}>Reset</Button>
      </Group>
      <Code block>{JSON.stringify(history, null, 2)}</Code>
    </>
  );
}
`;

function Demo() {
  const [value, handlers, history] = useStateHistory(1);
  return (
    <>
      <Text>Current value: {value()}</Text>
      <Group my="md">
        <Button onClick={() => handlers().set(Math.ceil(Math.random() * 100) + 1)}>
          Set value
        </Button>
        <Button onClick={() => handlers().back()}>Back</Button>
        <Button onClick={() => handlers().forward()}>Forward</Button>
        <Button onClick={() => handlers().reset()}>Reset</Button>
      </Group>
      <Code block>{JSON.stringify(history, null, 2)}</Code>
    </>
  );
}

export const useStateHistoryUsage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
