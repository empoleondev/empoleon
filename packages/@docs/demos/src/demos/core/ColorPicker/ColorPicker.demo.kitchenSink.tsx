import { createSignal } from 'solid-js';
import { ColorPicker, ColorPickerProps, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { ColorPicker, Text } from '@empoleon/core';

function Demo() {
  const [value, onChange] = useState('rgba(47, 119, 150, 0.7)');

  return (
    <>
      <ColorPicker format="rgba" value={value} onChange={onChange} />
      <Text>{value}</Text>
    </>
  );
}
`;

function Demo(props: ColorPickerProps) {
  const [value, onChange] = createSignal('rgba(47, 119, 150, 0.7)');

  return (
    <>
      <ColorPicker
        {...props}
        swatches={[
          '#2e2e2e',
          '#868e96',
          '#fa5252',
          '#e64980',
          '#be4bdb',
          '#7950f2',
          '#4c6ef5',
          '#228be6',
          '#15aabf',
          '#12b886',
          '#40c057',
          '#82c91e',
          '#fab005',
          '#fd7e14',
        ]}
        value={value()}
        onChange={onChange}
      />
      <Text mt="md">{value()}</Text>
    </>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      prop: 'format',
      type: 'select',
      initialValue: 'rgba',
      libraryValue: 'hex',
      data: [
        { label: 'HEX', value: 'hex' },
        { label: 'HEXA', value: 'hexa' },
        { label: 'RGB', value: 'rgb' },
        { label: 'RGBA', value: 'rgba' },
        { label: 'HSL', value: 'hsl' },
        { label: 'HSLA', value: 'hsla' },
      ],
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'withPicker',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'fullWidth',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'focusable',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'swatchesPerRow',
      type: 'number',
      initialValue: 7,
      libraryValue: 7,
      min: 1,
      max: 20,
      step: 1,
    },
  ],
};
