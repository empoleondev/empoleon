import { NumberFormatter, NumberFormatterProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { NumberFormatter } from '@empoleon/core';

function Demo() {
  return (
    <NumberFormatter{{props}} value={1234567.89} />
  );
}
`;

function Demo(props: NumberFormatterProps) {
  return (
    <NumberFormatter
      {...props}
      value={props.value ?? 1234567.89}
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
      prop: 'prefix',
      type: 'string',
      initialValue: '',
      libraryValue: ''
    },
    {
      prop: 'suffix',
      type: 'string',
      initialValue: '',
      libraryValue: ''
    },
    {
      prop: 'thousandSeparator',
      type: 'string',
      initialValue: '',
      libraryValue: ''
    },
    {
      prop: 'decimalSeparator',
      type: 'string',
      initialValue: '.',
      libraryValue: '.'
    },
    {
      prop: 'decimalScale',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined
    },
    {
      prop: 'fixedDecimalScale',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
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
      prop: 'allowNegative',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
    {
      prop: 'allowDecimal',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
  ],
};
