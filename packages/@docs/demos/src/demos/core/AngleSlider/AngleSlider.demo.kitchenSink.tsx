import { AngleSlider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { AngleSlider } from '@empoleon/core';

function Demo() {
  return (
    <AngleSlider
      aria-label="Angle slider"{{props}}
    />
  );
}
`;

function Demo(props: any) {
  const [value, setValue] = createSignal(props.defaultValue || 0);

  createEffect(() => {
    if (props.defaultValue !== undefined) {
      setValue(props.defaultValue);
    }
  });

  const formatLabel = () => props.withLabel
    ? props.labelFormat === 'degrees'
      ? (val: number) => `${val}°`
      : props.labelFormat === 'radians'
      ? (val: number) => `${(val * Math.PI / 180).toFixed(2)} rad`
      : undefined
    : null;

  const marks = () => props.withMarks
  ? props.markType === 'cardinal'
    ? [
        { value: 0, label: props.withMarkLabels ? (props.labelFormat === 'radians' ? '0 rad' : '0°') : undefined },
        { value: 90, label: props.withMarkLabels ? (props.labelFormat === 'radians' ? `${(90 * Math.PI / 180).toFixed(2)} rad` : '90°') : undefined },
        { value: 180, label: props.withMarkLabels ? (props.labelFormat === 'radians' ? `${(180 * Math.PI / 180).toFixed(2)} rad` : '180°') : undefined },
        { value: 270, label: props.withMarkLabels ? (props.labelFormat === 'radians' ? `${(270 * Math.PI / 180).toFixed(2)} rad` : '270°') : undefined },
      ]
    : props.markType === 'octants'
    ? [
        { value: 0, label: props.withMarkLabels ? (props.labelFormat === 'radians' ? '0 rad' : '0°') : undefined },
        { value: 45, label: props.withMarkLabels ? (props.labelFormat === 'radians' ? `${(45 * Math.PI / 180).toFixed(2)} rad` : '45°') : undefined },
        { value: 90, label: props.withMarkLabels ? (props.labelFormat === 'radians' ? `${(90 * Math.PI / 180).toFixed(2)} rad` : '90°') : undefined },
        { value: 135, label: props.withMarkLabels ? (props.labelFormat === 'radians' ? `${(135 * Math.PI / 180).toFixed(2)} rad` : '135°') : undefined },
        { value: 180, label: props.withMarkLabels ? (props.labelFormat === 'radians' ? `${(180 * Math.PI / 180).toFixed(2)} rad` : '180°') : undefined },
        { value: 225, label: props.withMarkLabels ? (props.labelFormat === 'radians' ? `${(225 * Math.PI / 180).toFixed(2)} rad` : '225°') : undefined },
        { value: 270, label: props.withMarkLabels ? (props.labelFormat === 'radians' ? `${(270 * Math.PI / 180).toFixed(2)} rad` : '270°') : undefined },
        { value: 315, label: props.withMarkLabels ? (props.labelFormat === 'radians' ? `${(315 * Math.PI / 180).toFixed(2)} rad` : '315°') : undefined },
      ]
    : undefined
  : undefined;

  return (
    <AngleSlider
      {...props}
      value={value()}
      onChange={setValue}
      formatLabel={formatLabel()}
      marks={marks()}
      aria-label="Angle slider"
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
      type: 'number',
      prop: 'size',
      initialValue: 100,
      libraryValue: '__',
      min: 50,
      max: 200,
    },
    {
      type: 'number',
      prop: 'thumbSize',
      initialValue: 16,
      libraryValue: '__',
      min: 4,
      max: 40,
    },
    {
      type: 'number',
      prop: 'defaultValue',
      initialValue: 180,
      libraryValue: 0,
      min: 0,
      max: 360,
    },
    {
      type: 'boolean',
      prop: 'withLabel',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'select',
      prop: 'labelFormat',
      initialValue: 'degrees',
      libraryValue: '__',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Degrees (°)', value: 'degrees' },
        { label: 'Radians', value: 'radians' },
      ],
    },
    {
      type: 'boolean',
      prop: 'withMarks',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'select',
      prop: 'markType',
      initialValue: 'cardinal',
      libraryValue: '__',
      data: [
        { label: 'Cardinal (4)', value: 'cardinal' },
        { label: 'Octants (8)', value: 'octants' },
      ],
    },
    {
      type: 'boolean',
      prop: 'withMarkLabels',
      initialValue: true,
      libraryValue: false,
    },
    {
      type: 'boolean',
      prop: 'restrictToMarks',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'boolean',
      prop: 'disabled',
      initialValue: false,
      libraryValue: false,
    },
  ],
};
