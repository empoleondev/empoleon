import { createSignal } from 'solid-js';
import { Select, SelectProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Select } from '@empoleon/core';

function Demo() {
  return (
    <Select{{props}}
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
`;

function Demo(
  props: SelectProps & {
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
    <Select
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
      prop: 'searchable',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'clearable',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'allowDeselect',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withCheckIcon',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'checkIconPosition',
      type: 'select',
      initialValue: 'left',
      libraryValue: 'left',
      data: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      prop: 'withScrollArea',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'maxDropdownHeight',
      type: 'number',
      initialValue: 220,
      libraryValue: 220,
      min: 100,
      max: 500,
      step: 20,
    },
    {
      prop: 'limit',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: 1,
      max: 20,
      step: 1,
    },
    {
      prop: 'nothingFoundMessage',
      type: 'string',
      initialValue: '',
      libraryValue: '',
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
