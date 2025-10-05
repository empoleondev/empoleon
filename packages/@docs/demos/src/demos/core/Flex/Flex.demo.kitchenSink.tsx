import { Button, Flex, FlexProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Wrapper(props: FlexProps) {
  return (
    <Flex mih={50} bg="rgba(0, 0, 0, .3)" {...props}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Flex>
  );
}

const code = `
import { Flex, Button } from '@empoleon/core';


function Demo() {
  return (
    <Flex
      mih={50}
      bg="rgba(0, 0, 0, .3)"
      {{props}}
    >
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Flex>
  );
}
`;

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'rowGap',
      type: 'size',
      initialValue: 'md',
      libraryValue: undefined,
    },
    {
      prop: 'columnGap',
      type: 'size',
      initialValue: 'md',
      libraryValue: undefined,
    },
    {
      prop: 'justify',
      type: 'select',
      initialValue: 'flex-start',
      libraryValue: null,
      data: [
        { label: 'flex-start', value: 'flex-start' },
        { label: 'flex-end', value: 'flex-end' },
        { label: 'center', value: 'center' },
        { label: 'space-between', value: 'space-between' },
        { label: 'space-around', value: 'space-around' },
        { label: 'space-evenly', value: 'space-evenly' },
      ],
    },
    {
      prop: 'align',
      type: 'select',
      initialValue: 'flex-start',
      libraryValue: null,
      data: [
        { label: 'flex-start', value: 'flex-start' },
        { label: 'flex-end', value: 'flex-end' },
        { label: 'center', value: 'center' },
        { label: 'stretch', value: 'stretch' },
        { label: 'baseline', value: 'baseline' },
      ],
    },
    {
      prop: 'direction',
      type: 'select',
      initialValue: 'row',
      libraryValue: null,
      data: [
        { label: 'row', value: 'row' },
        { label: 'row-reverse', value: 'row-reverse' },
        { label: 'column', value: 'column' },
        { label: 'column-reverse', value: 'column-reverse' },
      ],
    },
    {
      prop: 'wrap',
      type: 'select',
      initialValue: 'wrap',
      libraryValue: null,
      data: [
        { label: 'wrap', value: 'wrap' },
        { label: 'nowrap', value: 'nowrap' },
        { label: 'wrap-reverse', value: 'wrap-reverse' },
      ],
    },
  ],
};
