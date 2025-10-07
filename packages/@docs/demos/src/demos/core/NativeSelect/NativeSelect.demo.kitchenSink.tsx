import { createSignal } from 'solid-js';
import { NativeSelect, NativeSelectProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { NativeSelect } from '@empoleon/core';

function Demo() {
  return (
    <NativeSelect{{props}}
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
`;

function Demo(
  props: NativeSelectProps & {
    hasLeftSection?: boolean;
    hasRightSection?: boolean;
  }
) {
  const getLeftSection = () => {
    if (!props.hasLeftSection) return undefined;
    return '🔽';
  };

  const getRightSection = () => {
    if (!props.hasRightSection) return undefined;
    return '✓';
  };

  return (
    <NativeSelect
      {...props}
      data={['React', 'Angular', 'Vue', 'Svelte']}
      leftSection={getLeftSection()}
      rightSection={getRightSection()}
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
      prop: 'label',
      type: 'string',
      initialValue: 'Select your framework',
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
      prop: 'placeholder',
      type: 'string',
      initialValue: 'Pick one',
      libraryValue: '',
    },
    {
      prop: 'withAsterisk',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'required',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
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
      libraryValue: 'sm',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
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
      prop: 'withErrorStyles',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'hasLeftSection',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'hasRightSection',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
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
    {
      prop: 'leftSectionWidth',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: 0,
      max: 100,
      step: 5,
    },
    {
      prop: 'rightSectionWidth',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: 0,
      max: 100,
      step: 5,
    },
  ],
};
