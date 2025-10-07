import { createEffect, createSignal } from 'solid-js';
import { Pill, PillsInput } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { PillsInput, Pill } from '@empoleon/core';

function Demo() {
  return (
    <PillsInput{{props}}>
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <Pill>Svelte</Pill>
        <PillsInput.Field placeholder="Enter tags" />
      </Pill.Group>
    </PillsInput>
  );
}
`;

function Demo(props: any) {
  const [disabled, setDisabled] = createSignal(props.disabled || false);
  const [error, setError] = createSignal(props.error);

  createEffect(() => {
    setDisabled(props.disabled || false);
    setError(props.error);
  });

  return (
    <PillsInput {...props} disabled={disabled()} error={error()}>
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <Pill>Svelte</Pill>
        <PillsInput.Field placeholder={props.placeholder} />
      </Pill.Group>
    </PillsInput>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 440,
  controls: [
    {
      prop: 'label',
      type: 'string',
      initialValue: 'PillsInput label',
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
      initialValue: 'Enter tags',
      libraryValue: '',
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
      prop: 'disabled',
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
      prop: 'withAsterisk',
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
      prop: 'pointer',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
  ],
};
