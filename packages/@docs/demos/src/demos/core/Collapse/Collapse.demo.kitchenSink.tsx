import { Box, Button, Collapse, CollapseProps, Group, Text } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { Button, Group, Text, Collapse, Box } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';

function Demo() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Button onClick={toggle}>Toggle content</Button>
      </Group>

      <Collapse{{props}}>
        <Text>
          From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon that has blue-green skin with
          darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of
          its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are
          visible in the upper jaw when its mouth is open. Each of its thick legs ends with three
          sharp claws. On Bulbasaur's back is a green plant bulb, which is grown from a seed
          planted there at birth. The bulb also conceals two slender, tentacle-like vines and
          provides it with energy through photosynthesis as well as from the nutrient-rich seeds
          contained within.
        </Text>
      </Collapse>
    </Box>
  );
}
`;

function Demo(props: Omit<CollapseProps, 'children' | 'in'>) {
  const [opened, { toggle }] = useDisclosure(false);
  const [transitionDuration, setTransitionDuration] = createSignal(props.transitionDuration || 200);
  const [transitionTimingFunction, setTransitionTimingFunction] = createSignal(
    props.transitionTimingFunction || 'ease'
  );
  const [animateOpacity, setAnimateOpacity] = createSignal(props.animateOpacity ?? true);

  createEffect(() => {
    setTransitionDuration(props.transitionDuration || 200);
    setTransitionTimingFunction(props.transitionTimingFunction || 'ease');
    setAnimateOpacity(props.animateOpacity ?? true);
  });

  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Button onClick={toggle}>Toggle content</Button>
      </Group>

      <Collapse
        in={opened()}
        transitionDuration={transitionDuration()}
        transitionTimingFunction={transitionTimingFunction()}
        animateOpacity={animateOpacity()}
        onTransitionEnd={() => console.log('Transition ended')}
      >
        <Text>
          From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon that has blue-green skin with
          darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of
          its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are
          visible in the upper jaw when its mouth is open. Each of its thick legs ends with three
          sharp claws. On Bulbasaur&apos;s back is a green plant bulb, which is grown from a seed
          planted there at birth. The bulb also conceals two slender, tentacle-like vines and
          provides it with energy through photosynthesis as well as from the nutrient-rich seeds
          contained within.
        </Text>
      </Collapse>
    </Box>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      prop: 'transitionDuration',
      type: 'number',
      initialValue: 200,
      libraryValue: 200,
      min: 0,
      max: 2000,
      step: 50,
    },
    {
      prop: 'transitionTimingFunction',
      type: 'select',
      initialValue: 'ease',
      libraryValue: 'ease',
      data: [
        { label: 'Ease', value: 'ease' },
        { label: 'Linear', value: 'linear' },
        { label: 'Ease-in', value: 'ease-in' },
        { label: 'Ease-out', value: 'ease-out' },
        { label: 'Ease-in-out', value: 'ease-in-out' },
      ],
    },
    {
      prop: 'animateOpacity',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
  ],
};
