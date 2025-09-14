import { Button, Group, NumberInput, NumberInputHandlers } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useRef } from 'react';
import { NumberInput, Group, Button, NumberInputHandlers } from '@empoleon/core';

function Demo() {
  const handlersRef = useRef<NumberInputHandlers>(null);
  return (
    <>
      <NumberInput
        label="Click buttons to change value"
        placeholder="Click the buttons"
        handlersRef={handlersRef}
        step={2}
        min={10}
        max={20}
        defaultValue={15}
      />

      <Group mt="md" justify="center">
        <Button onClick={() => handlersRef.current?.decrement()} variant="default">
          Decrement by 2
        </Button>

        <Button onClick={() => handlersRef.current?.increment()} variant="default">
          Increment by 2
        </Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const [handlersRef, setHandlersRef] = createSignal<NumberInputHandlers | null>(null)

  return (
    <>
      <NumberInput
        label="Click buttons to change value"
        placeholder="Click the buttons"
        handlersRef={setHandlersRef}
        step={2}
        min={10}
        max={20}
        defaultValue={15}
      />

      <Group mt="md" justify="center">
        <Button onClick={() => handlersRef()?.decrement()} variant="default">
          Decrement by 2
        </Button>

        <Button onClick={() => handlersRef()?.increment()} variant="default">
          Increment by 2
        </Button>
      </Group>
    </>
  );
}

export const handlers: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
