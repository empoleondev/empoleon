import { Slider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { Slider } from '@empoleon/core';

function Demo() {
  return (
    <Slider
      {{props}}
      defaultValue={40}
      marks={[
        { value: 20, label: '20%' },
        { value: 50, label: '50%' },
        { value: 80, label: '80%' },
      ]}
    />
  );
}
`;

function Demo(props: any) {
  const [value, setValue] = createSignal(props.value ?? props.defaultValue ?? 40);

  createEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  });

  const handleChange = (newValue: number) => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <Slider
      {...props}
      value={props.controlled ? value() : undefined}
      defaultValue={props.controlled ? undefined : props.defaultValue}
      onChange={props.controlled ? handleChange : props.onChange}
      marks={
        props.showMarks
          ? [
              { value: 20, label: '20%' },
              { value: 50, label: '50%' },
              { value: 80, label: '80%' },
            ]
          : undefined
      }
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
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
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
      initialValue: 'xl',
      libraryValue: 'xl',
    },
    {
      prop: 'min',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      min: -100,
      max: 100,
      step: 10,
    },
    {
      prop: 'max',
      type: 'number',
      initialValue: 100,
      libraryValue: 100,
      min: 0,
      max: 200,
      step: 10,
    },
    {
      prop: 'step',
      type: 'number',
      initialValue: 1,
      libraryValue: 1,
      min: 1,
      max: 25,
      step: 1,
    },
    {
      prop: 'value',
      type: 'number',
      initialValue: 40,
      libraryValue: null,
      min: 0,
      max: 100,
      step: 5,
    },
    {
      prop: 'showMarks',
      type: 'boolean',
      initialValue: true,
      libraryValue: false,
    },
    {
      prop: 'showLabelOnHover',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'labelAlwaysOn',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'thumbSize',
      type: 'number',
      initialValue: 16,
      libraryValue: 16,
      min: 10,
      max: 40,
      step: 2,
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'inverted',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'restrictToMarks',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    }
  ],
};
