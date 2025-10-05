import { RangeSlider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { RangeSlider } from '@empoleon/core';

function Demo() {
  return (
    <RangeSlider
      {{props}}
      defaultValue={[20, 60]}
      marks={[
        { value: 20, label: '20%' },
        { value: 50, label: '50%' },
        { value: 80, label: '80%' },
      ]}
    />
  );
}
`;

function Wrapper(props: any) {
  const [value, setValue] = createSignal<[number, number]>(props.value || [20, 60]);

  createEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  });

  const labelFormatter = (val: number) => {
    if (props.labelFormat === 'celsius') {
      return `${val} °C`;
    } else if (props.labelFormat === 'percentage') {
      return `${val}%`;
    }
    return val.toString();
  };

  const getLabel = () => {
    if (props.labelFormat === 'none') {
      return null;
    }
    return labelFormatter;
  };

  const getMarks = () => {
    if (props.showMarks) {
      const formatMarkLabel = (val: number) => {
        if (!props.showMarkLabels) return undefined;
        if (props.labelFormat === 'celsius') return `${val} °C`;
        if (props.labelFormat === 'percentage') return `${val}%`;
        return `${val}`;
      };

      return [
        { value: 20, label: formatMarkLabel(20) },
        { value: 50, label: formatMarkLabel(50) },
        { value: 80, label: formatMarkLabel(80) },
      ];
    }
    return undefined;
  };

  return (
    <RangeSlider
      {...props}
      value={value()}
      onChange={setValue}
      label={getLabel()}
      marks={getMarks()}
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 400,
  controls: [
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue'
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
      initialValue: 'xl',
      libraryValue: 'xl'
    },
    {
      prop: 'min',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 50,
      step: 1
    },
    {
      prop: 'max',
      type: 'number',
      initialValue: 100,
      libraryValue: 100,
      min: 50,
      max: 200,
      step: 10
    },
    {
      prop: 'step',
      type: 'number',
      initialValue: 1,
      libraryValue: 1,
      min: 1,
      max: 10,
      step: 1
    },
    {
      prop: 'minRange',
      type: 'number',
      initialValue: 10,
      libraryValue: 10,
      min: 0,
      max: 50,
      step: 5
    },
    {
      prop: 'showLabelOnHover',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
    {
      prop: 'labelAlwaysOn',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'labelFormat',
      type: 'select',
      initialValue: 'default',
      libraryValue: 'default',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Celsius', value: 'celsius' },
        { label: 'Percentage', value: 'percentage' },
      ],
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'inverted',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'showMarks',
      type: 'boolean',
      initialValue: true,
      libraryValue: false
    },
    {
      prop: 'showMarkLabels',
      type: 'boolean',
      initialValue: true,
      libraryValue: false
    },
    {
      prop: 'restrictToMarks',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'thumbSize',
      type: 'number',
      initialValue: 16,
      libraryValue: 16,
      min: 10,
      max: 32,
      step: 2
    },
    {
      prop: 'pushOnOverlap',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
  ],
};
