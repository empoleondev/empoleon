import { ColorInput, ColorInputProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { IconPalette } from '@tabler/icons-solidjs';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { ColorInput } from '@empoleon/core';

function Demo() {
  return (
    <ColorInput
      {{props}}
      placeholder="Pick a color"
      label="Your favorite color"
      description="Choose any color you like"
    />
  );
}
`;

function Demo(props: ColorInputProps) {
  const [value, setValue] = createSignal(props.value || '#C5D899');

  createEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  });

  return (
    <ColorInput
      {...props}
      value={value()}
      onChange={setValue}
      swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
      placeholder="Pick a color"
      label="Your favorite color"
      description="Choose any color you like"
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
      prop: 'format',
      type: 'select',
      initialValue: 'hex',
      libraryValue: 'hex',
      data: [
        { label: 'hex', value: 'hex' },
        { label: 'hexa', value: 'hexa' },
        { label: 'rgba', value: 'rgba' },
        { label: 'rgb', value: 'rgb' },
        { label: 'hsl', value: 'hsl' },
        { label: 'hsla', value: 'hsla' },
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
      prop: 'withPicker',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withEyeDropper',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'disallowInput',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'fixOnBlur',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'closeOnColorSwatchClick',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
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
      prop: 'withAsterisk',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'error',
      type: 'string',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'swatchesPerRow',
      type: 'number',
      initialValue: 7,
      libraryValue: 7,
      min: 1,
      max: 14,
      step: 1,
    },
  ],
};
