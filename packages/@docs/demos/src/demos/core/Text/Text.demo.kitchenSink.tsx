import { createEffect } from 'solid-js';
import { Box, rgba, Text, TextProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Demo(props: TextProps & { c?: string; color2?: string; gradientType?: boolean }) {
  const textProps = () => {
    const { gradientType, color, color2, lineClamp, truncate, ...rest } = props;

    if (gradientType && color && color2) {
      const color1 = rgba(color, 1);
      const color2Converted = rgba(color2, 1);

      const baseProps = {
        ...rest,
        variant: 'gradient',
        gradient: { from: color1, to: color2Converted, deg: 90 },
      };

      return baseProps;
    }

    // Filter out color2 when gradient is off, keep color as c prop
    const baseProps = { ...rest, c: color };

    // Add lineClamp and truncate based on lineClamp value
    if (lineClamp && lineClamp > 0) {
      return { ...baseProps, lineClamp };
    }
    return baseProps;
  };

  return (
    <Box maw={400} mx="auto">
      <Text {...textProps()}>
        From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon that has blue-green skin with
        darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of
        its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are
        visible in the upper jaw when its mouth is open. Each of its thick legs ends with three
        sharp claws. On Bulbasaur&apos;s back is a green plant bulb, which is grown from a seed
        planted there at birth. The bulb also conceals two slender, tentacle-like vines and provides
        it with energy through photosynthesis as well as from the nutrient-rich seeds contained
        within.
      </Text>
    </Box>
  );
}

const code = `
import { Text } from '@empoleon/core';

function Demo() {
  return (
    <Text{{props}}>
      From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon...
    </Text>
  );
}
`;

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  controls: [
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'lineClamp',
      type: 'number',
      initialValue: null,
      libraryValue: null,
      min: 0,
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
    {
      prop: 'span',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'gradientType',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      prop: 'color2',
      type: 'color',
      initialValue: 'cyan',
      libraryValue: 'cyan',
    },
  ],
};
