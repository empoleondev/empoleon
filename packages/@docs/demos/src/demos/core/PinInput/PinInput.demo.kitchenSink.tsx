import { PinInput, PinInputProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { PinInput } from '@empoleon/core';

function Demo() {
  return <PinInput{{props}} />
}
`;

function Wrapper(props: PinInputProps) {
  return <PinInput {...props} />;
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
      libraryValue: 'sm',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'length',
      type: 'number',
      initialValue: 4,
      libraryValue: 4,
      min: 1,
      max: 10,
    },
    {
      prop: 'type',
      type: 'select',
      initialValue: 'alphanumeric',
      libraryValue: 'alphanumeric',
      data: [
        { label: 'Alphanumeric', value: 'alphanumeric' },
        { label: 'Number', value: 'number' },
      ],
    },
    {
      prop: 'inputType',
      type: 'select',
      initialValue: 'text',
      libraryValue: 'text',
      data: [
        { label: 'Text', value: 'text' },
        { label: 'Tel', value: 'tel' },
        { label: 'Password', value: 'password' },
      ],
    },
    {
      prop: 'inputMode',
      type: 'select',
      initialValue: 'text',
      libraryValue: 'text',
      data: [
        { label: 'Text', value: 'text' },
        { label: 'Numeric', value: 'numeric' },
        { label: 'Tel', value: 'tel' },
        { label: 'None', value: 'none' },
        { label: 'Decimal', value: 'decimal' },
        { label: 'Email', value: 'email' },
        { label: 'URL', value: 'url' },
        { label: 'Search', value: 'search' },
      ],
    },
    {
      prop: 'mask',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'placeholder',
      type: 'string',
      initialValue: '○',
      libraryValue: '○',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'readOnly',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'error',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'autoFocus',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'manageFocus',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'oneTimeCode',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'ariaLabel',
      type: 'string',
      initialValue: 'Pin input',
      libraryValue: undefined,
    },
    {
      prop: 'name',
      type: 'string',
      initialValue: '',
      libraryValue: undefined,
    },
    {
      prop: 'form',
      type: 'string',
      initialValue: '',
      libraryValue: undefined,
    },
  ],
};
