import { Button, Group } from '@empoleon/core';
import { createSpotlight, Spotlight, SpotlightProps } from '@empoleon/spotlight';
import { createMemo } from 'solid-js';

export function SpotlightDemoBase(props: Partial<SpotlightProps>) {
  const [store, actions] = createSpotlight();
  return (
    <>
      <Group justify="center">
        <Button onClick={actions.open}>Open spotlight</Button>
      </Group>
      <Spotlight actions={[]} store={store} {...props} />
    </>
  );
}
