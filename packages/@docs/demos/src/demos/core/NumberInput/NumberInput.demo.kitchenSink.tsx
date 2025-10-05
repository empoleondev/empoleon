import { NumberInput, NumberInputProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { NumberInput } from '@empoleon/core';

function Demo() {
  return (
    <NumberInput{{props}}
      label="Number input"
      description="Enter a number"
      placeholder="Enter number"
    />
  );
}
`;

function Demo(props: NumberInputProps) {
  return (
    <NumberInput
      {...props}
      label="Number input"
      description="Enter a number"
      placeholder="Enter number"
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
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
      prop: 'min',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: -100,
      max: 100,
      step: 1,
    },
    {
      prop: 'max',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: -100,
      max: 1000,
      step: 1,
    },
    {
      prop: 'step',
      type: 'number',
      initialValue: 1,
      libraryValue: 1,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    {
      prop: 'prefix',
      type: 'string',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'suffix',
      type: 'string',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'decimalScale',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      prop: 'decimalSeparator',
      type: 'string',
      initialValue: '.',
      libraryValue: '.',
    },
    {
      prop: 'thousandSeparator',
      type: 'select',
      initialValue: '',
      libraryValue: false,
      data: [
        { label: 'None', value: '' },
        { label: 'Comma (,)', value: ',' },
        { label: 'Space ( )', value: ' ' },
        { label: 'Period (.)', value: '.' },
      ],
    },
    {
      prop: 'thousandsGroupStyle',
      type: 'select',
      initialValue: 'thousand',
      libraryValue: 'thousand',
      data: [
        { label: 'Thousand', value: 'thousand' },
        { label: 'Lakh', value: 'lakh' },
        { label: 'Wan', value: 'wan' },
        { label: 'None', value: 'none' },
      ],
    },
    {
      prop: 'clampBehavior',
      type: 'select',
      initialValue: 'blur',
      libraryValue: 'blur',
      data: [
        { label: 'Blur', value: 'blur' },
        { label: 'Strict', value: 'strict' },
        { label: 'None', value: 'none' },
      ],
    },
    {
      prop: 'startValue',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      min: -100,
      max: 100,
      step: 1,
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
      prop: 'hideControls',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'allowNegative',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'allowDecimal',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'fixedDecimalScale',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'allowLeadingZeros',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'trimLeadingZeroesOnBlur',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withKeyboardEvents',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withAsterisk',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
  ],
};
