import { Button, Group, Skeleton, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { createSignal } from 'solid-js';
import { Skeleton, Button } from '@empoleon/core';

function Demo() {
  const [loading, setLoading] = createSignal(true);

  return (
    <>
      <Skeleton visible={loading()}>
        Lorem ipsum dolor sit amet...
        {/* other content */}
      </Skeleton>

      <Button onClick={() => setLoading((l) => !l)}>
        Toggle Skeleton
      </Button>
    </>
  );
}
`;

function Demo() {
  const [loading, setLoading] = createSignal(true);

  return (
    <>
      <Skeleton visible={loading()}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolor nihil amet tempore
          magnam optio, numquam nostrum inventore tempora assumenda saepe, aut repellat. Temporibus
          aspernatur aperiam magnam debitis facere odio?
        </Text>
        <Text>
          Laborum fuga quam voluptas aut pariatur delectus repudiandae commodi tempora debitis
          dolores vero cumque magni cum, deserunt, ad tempore consectetur libero molestias similique
          nemo eum! Dolore maxime voluptate inventore atque.
        </Text>
      </Skeleton>

      <Group justify="center" mt="xs">
        <Button onClick={() => setLoading((l) => !l)}>Toggle Skeleton</Button>
      </Group>
    </>
  );
}

export const content: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
