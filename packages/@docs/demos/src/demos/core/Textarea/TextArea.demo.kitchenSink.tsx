import { Textarea, TextareaProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Textarea } from '@empoleon/core';

function Demo() {
  return (
    <Textarea
      {{props}}
      placeholder="Input placeholder"
    />
  );
}
`;

function Wrapper(props: TextareaProps) {
  return <Textarea {...props} placeholder="Input placeholder" />;
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: [
    {
      prop: 'label',
      type: 'string',
      initialValue: 'Input label',
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
      prop: 'placeholder',
      type: 'string',
      initialValue: 'Input placeholder',
      libraryValue: ''
    },
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'default',
      libraryValue: 'default',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Filled', value: 'filled' },
        { label: 'Unstyled', value: 'unstyled' },
      ],
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
      prop: 'withAsterisk',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'required',
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
      prop: 'autosize',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'minRows',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: 1,
      max: 20,
      step: 1
    },
    {
      prop: 'maxRows',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: 1,
      max: 20,
      step: 1
    },
    {
      prop: 'resize',
      type: 'select',
      initialValue: 'none',
      libraryValue: 'none',
      data: [
        { label: 'None', value: 'none' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Both', value: 'both' },
      ],
    },
    {
      prop: 'withErrorStyles',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
    {
      prop: 'leftSection',
      type: 'string',
      initialValue: '',
      libraryValue: ''
    },
    {
      prop: 'rightSection',
      type: 'string',
      initialValue: '',
      libraryValue: ''
    },
    {
      prop: 'leftSectionPointerEvents',
      type: 'select',
      initialValue: 'auto',
      libraryValue: 'auto',
      data: [
        { label: 'Auto', value: 'auto' },
        { label: 'None', value: 'none' },
      ],
    },
    {
      prop: 'rightSectionPointerEvents',
      type: 'select',
      initialValue: 'auto',
      libraryValue: 'auto',
      data: [
        { label: 'Auto', value: 'auto' },
        { label: 'None', value: 'none' },
      ],
    },
  ],
};
