import { createSignal } from 'solid-js';
import { JsonInput, JsonInputProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { JsonInput } from '@empoleon/core';

function Demo() {
  return (
    <JsonInput
      {{props}}
      placeholder="Input placeholder"
      label="Your package.json"
      description="JSON input with validation"
    />
  );
}
`;

function Demo(
  props: JsonInputProps & {
    hasLeftSection?: boolean;
    hasRightSection?: boolean;
    multiline?: boolean;
  }
) {
  const [value, setValue] = createSignal('');

  const getLeftSection = () => {
    if (!props.hasLeftSection) {return undefined};
    return '📄';
  };

  const getRightSection = () => {
    if (!props.hasRightSection) {return undefined};
    return '✓';
  };

  return (
    <JsonInput
      {...props}
      value={value()}
      onChange={setValue}
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
  maxWidth: 500,
  controls: [
    {
      prop: 'label',
      type: 'string',
      initialValue: 'Your package.json',
      libraryValue: '',
    },
    {
      prop: 'description',
      type: 'string',
      initialValue: 'JSON input with validation',
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
      initialValue: 'Input placeholder',
      libraryValue: '',
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
      initialValue: 'md',
      libraryValue: 'md',
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
      prop: 'formatOnBlur',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'autosize',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'minRows',
      type: 'number',
      initialValue: 4,
      libraryValue: undefined,
      min: 1,
      max: 20,
      step: 1,
    },
    {
      prop: 'maxRows',
      type: 'number',
      initialValue: 10,
      libraryValue: undefined,
      min: 1,
      max: 30,
      step: 1,
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
      prop: 'validationError',
      type: 'string',
      initialValue: 'Invalid JSON',
      libraryValue: 'Invalid json',
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
  ],
};
