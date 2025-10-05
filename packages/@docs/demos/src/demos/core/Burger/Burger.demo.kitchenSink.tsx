import { Burger, BurgerProps } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createEffect } from 'solid-js';

const code = `
import { useDisclosure } from '@empoleon/hooks';
import { Burger } from '@empoleon/core';

function Demo() {
  const [opened, { toggle }] = useDisclosure();
  return <Burger{{props}} opened={opened()} onClick={toggle} aria-label="Toggle navigation" />;
}
`;

function Demo(props: BurgerProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Burger
      {...props}
      opened={opened()}
      onClick={toggle}
      aria-label="Toggle navigation"
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md'
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'gray',
      libraryValue: 'gray'
    },
    {
      prop: 'lineSize',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: 1,
      max: 10,
      step: 0.5
    },
    {
      prop: 'transitionDuration',
      type: 'number',
      initialValue: 300,
      libraryValue: 300,
      min: 0,
      max: 1000,
      step: 50
    },
    {
      prop: 'transitionTimingFunction',
      type: 'select',
      initialValue: 'ease',
      libraryValue: 'ease',
      data: [
        { label: 'Ease', value: 'ease' },
        { label: 'Ease In', value: 'ease-in' },
        { label: 'Ease Out', value: 'ease-out' },
        { label: 'Ease In Out', value: 'ease-in-out' },
        { label: 'Linear', value: 'linear' },
      ],
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    }
  ],
};
