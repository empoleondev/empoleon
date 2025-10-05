import { Textarea, TextareaProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { IconAt } from '@tabler/icons-solidjs';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { Textarea } from '@empoleon/core';

function Demo() {
  return (
    <Textarea
      {{props}}
      placeholder="Your comment"
    />
  );
}
`;

function Demo(props: TextareaProps) {
  const [value, setValue] = createSignal(props.value || '');

  createEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  });

  return (
    <Textarea
      {...props}
      value={value()}
      onInput={(e) => setValue(e.currentTarget.value)}
      placeholder="Your comment"
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
  controls: [
    {
      prop: 'label',
      type: 'string',
      initialValue: 'Your comment',
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
      libraryValue: 'md'
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'withAsterisk',
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
      prop: 'resize',
      type: 'select',
      initialValue: 'none',
      libraryValue: 'none',
      data: [
        { label: 'None', value: 'none' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Both', value: 'both' },
      ],
    },
  ],
};
