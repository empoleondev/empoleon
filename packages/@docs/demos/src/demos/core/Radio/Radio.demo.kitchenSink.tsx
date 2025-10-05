import { Radio, RadioProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { IconCheck, IconCircle } from '@tabler/icons-solidjs';

const code = `
import { Radio } from '@empoleon/core';

function Demo() {
  return (
    <Radio.Group name="demo" defaultValue="react">
      <Radio value="react"{{props}} />
    </Radio.Group>
  );
}
`;

function Wrapper(props: RadioProps) {
  return (
    <Radio.Group name="demo" defaultValue="react">
      <Radio
        value="react"
        {...props}
      />
    </Radio.Group>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'filled',
      libraryValue: 'filled',
      data: [
        { label: 'Filled', value: 'filled' },
        { label: 'Outline', value: 'outline' },
      ],
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'labelPosition',
      type: 'segmented',
      data: [
        { value: 'right', label: 'Right' },
        { value: 'left', label: 'Left' },
      ],
      initialValue: 'right',
      libraryValue: 'right',
    },
    {
      prop: 'label',
      type: 'string',
      initialValue: 'I cannot be unchecked',
      libraryValue: '',
    },
    {
      prop: 'description',
      type: 'string',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'error',
      type: 'string',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    }
  ],
};
