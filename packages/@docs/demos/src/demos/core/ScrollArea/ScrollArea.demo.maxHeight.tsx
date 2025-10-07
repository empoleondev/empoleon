import { For } from 'solid-js';
import { Button, Group, ScrollArea } from '@empoleon/core';
import { useCounter } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const lorem =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta perspiciatis reiciendis voluptate eaque itaque quos. Natus iure tenetur libero, reprehenderit ad, sequi, in aliquam eos necessitatibus expedita delectus veniam culpa!';

const code = `
import { For } from 'solid-js';
import { useCounter } from '@empoleon/hooks';
import { ScrollArea, Button, Group } from '@empoleon/core';

const lorem =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta perspiciatis reiciendis voluptate eaque itaque quos. Natus iure tenetur libero, reprehenderit ad, sequi, in aliquam eos necessitatibus expedita delectus veniam culpa!';

function Demo() {
  const [count, handlers] = useCounter(3, { min: 0, max: 10 });

  return (
    <>
      <ScrollArea.Autosize mah={300} maw={400} mx="auto">
        <For each={Array(count).fill(0)}>
          {() => <p>{lorem}</p>}
        </For>
      </ScrollArea.Autosize>

      <Group justify="center" mt="md">
        <Button color="red" onClick={handlers.decrement}>
          Remove paragraph
        </Button>
        <Button onClick={handlers.increment}>
          Add paragraph
        </Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const [count, handlers] = useCounter(3, { min: 0, max: 10 });

  return (
    <>
      <ScrollArea.Autosize mah={300} maw={400} mx="auto">
        <For each={Array(count()).fill(0)}>{() => <p>{lorem}</p>}</For>
      </ScrollArea.Autosize>

      <Group justify="center" mt="md">
        <Button color="red" onClick={handlers.decrement}>
          Remove paragraph
        </Button>
        <Button onClick={handlers.increment}>Add paragraph</Button>
      </Group>
    </>
  );
}

export const maxHeight: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
