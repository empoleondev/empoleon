import { Anchor, AnchorProps, Box } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Anchor } from '@empoleon/core';

function Demo() {
  return (
    <Anchor{{props}} href="https://mantine.dev/" target="_blank">
      {{children}}
    </Anchor>
  );
}
`;

function Wrapper(props: AnchorProps & { children?: string }) {
  return (
    <Box maw={400} mx="auto">
      <Anchor href="https://mantine.dev/" target="_blank" {...props} />
    </Box>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      prop: 'children',
      type: 'textarea',
      initialValue: `From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon that has blue-green skin with darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are visible in the upper jaw when its mouth is open. Each of its thick legs ends with three sharp claws. On Bulbasaur's back is a green plant bulb, which is grown from a seed planted there at birth. The bulb also conceals two slender, tentacle-like vines and provides it with energy through photosynthesis as well as from the nutrient-rich seeds contained within.`,
      libraryValue: 'Anchor component',
    },
    {
      prop: 'underline',
      type: 'select',
      initialValue: 'hover',
      libraryValue: 'hover',
      data: [
        { label: 'Hover', value: 'hover' },
        { label: 'Always', value: 'always' },
        { label: 'Never', value: 'never' },
        { label: 'Not Hover', value: 'not-hover' },
      ],
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'truncate',
      type: 'select',
      initialValue: 'none',
      libraryValue: 'none',
      data: [
        { label: 'None', value: 'none' },
        { label: 'Start', value: 'start' },
        { label: 'End', value: 'end' },
      ],
    },
    {
      prop: 'lineClamp',
      type: 'number',
      initialValue: 4,
      libraryValue: 4,
      min: 1,
      max: 10,
      step: 1,
    },
    {
      prop: 'inline',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'inherit',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
  ],
};
