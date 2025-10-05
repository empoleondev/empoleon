import { Checkbox, CheckboxProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Checkbox } from '@empoleon/core';

function Demo() {
  return (
    <Checkbox
      defaultChecked
      {{props}}
    />
  );
}
`;

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: (props: CheckboxProps) => <Checkbox {...props} defaultChecked />,
  code,
  centered: true,
  controls: [
    {
      prop: 'variant',
      type: 'segmented',
      data: [
        { value: 'filled', label: 'Filled' },
        { value: 'outline', label: 'Outline' },
      ],
      initialValue: 'filled',
      libraryValue: 'filled',
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue'
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm'
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm'
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
      initialValue: 'I agree to sell my privacy',
      libraryValue: ''
    },
    {
      prop: 'description',
      type: 'string',
      initialValue: '',
      libraryValue: ''
    },
    {
      prop: 'error',
      type: 'string',
      initialValue: '',
      libraryValue: ''
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'indeterminate',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
  ],
};
