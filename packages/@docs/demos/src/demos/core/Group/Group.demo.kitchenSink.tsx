import { Button, Group } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Group, Button } from '@empoleon/core';

function Demo() {
  return (
    <Group{{props}}>
      <Button variant="default">First</Button>
      <Button variant="default">Second</Button>
      <Button variant="default">Third</Button>
    </Group>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Group {...props}>
      <Button variant="default">First</Button>
      <Button variant="default">Second</Button>
      <Button variant="default">Third</Button>
    </Group>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'select',
      prop: 'justify',
      initialValue: 'flex-start',
      libraryValue: 'flex-start',
      data: [
        { label: 'Flex-start', value: 'flex-start' },
        { label: 'Center', value: 'center' },
        { label: 'Flex-end', value: 'flex-end' },
        { label: 'Space-between', value: 'space-between' },
        { label: 'Space-around', value: 'space-around' },
        { label: 'Space-evenly', value: 'space-evenly' },
      ],
    },
    {
      type: 'select',
      prop: 'align',
      initialValue: 'center',
      libraryValue: 'center',
      data: [
        { label: 'Stretch', value: 'stretch' },
        { label: 'Center', value: 'center' },
        { label: 'Flex-start', value: 'flex-start' },
        { label: 'Flex-end', value: 'flex-end' },
        { label: 'Baseline', value: 'baseline' },
      ],
    },
    {
      type: 'select',
      prop: 'wrap',
      initialValue: 'wrap',
      libraryValue: 'wrap',
      data: [
        { label: 'Wrap', value: 'wrap' },
        { label: 'Nowrap', value: 'nowrap' },
        { label: 'Wrap-reverse', value: 'wrap-reverse' },
      ],
    },
    {
      type: 'size',
      prop: 'gap',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      type: 'boolean',
      prop: 'grow',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'boolean',
      prop: 'preventGrowOverflow',
      initialValue: true,
      libraryValue: true,
    },
  ],
};
