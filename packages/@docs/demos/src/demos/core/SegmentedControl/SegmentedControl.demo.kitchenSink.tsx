import { Box, SegmentedControl } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { SegmentedControl } from '@empoleon/core';

function Demo() {
  return <SegmentedControl{{props}} data={['React', 'Angular', 'Vue', 'Svelte']} />;
}
`;

function Wrapper(props: any) {
  return <Box w={500} style={{ "text-align": "center" }}>
    <SegmentedControl data={['React', 'Angular', 'Vue', 'Svelte']} {...props} />
  </Box>;
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: null
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md'
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm'
    },
    {
      prop: 'fullWidth',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'readOnly',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'withItemsBorders',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
    {
      prop: 'orientation',
      type: 'select',
      initialValue: 'horizontal',
      libraryValue: 'horizontal',
      data: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
    },
    {
      prop: 'transitionDuration',
      type: 'number',
      initialValue: 200,
      libraryValue: 200,
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
        { label: 'Linear', value: 'linear' },
        { label: 'Ease In', value: 'ease-in' },
        { label: 'Ease Out', value: 'ease-out' },
        { label: 'Ease In Out', value: 'ease-in-out' },
      ],
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
  ],
};
