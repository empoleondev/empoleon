import { BoxProps, ElementProps, Input, Slider } from '@empoleon/core';
import { getControlLabel } from './get-control-label';
import { ConfiguratorControl } from './types';
import { createMemo, splitProps } from 'solid-js';

const MARKS = [
  { value: 0, label: 'xs' },
  { value: 25, label: 'sm' },
  { value: 50, label: 'md' },
  { value: 75, label: 'lg' },
  { value: 100, label: 'xl' },
];

export type ConfiguratorSizeControlOptions = ConfiguratorControl<'size', { initialValue: string }>;

export interface ConfiguratorSizeControlProps extends BoxProps, ElementProps<'div', 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  prop: string;
}

export function ConfiguratorSizeControl(props: ConfiguratorSizeControlProps) {
  const [local, others] = splitProps(props, [
    'value',
    'onChange',
    'prop',
  ]);

  const _value = createMemo(() => MARKS.find((mark) => mark.label === local.value)!.value);
  const handleChange = (val: number) => local.onChange(MARKS.find((mark) => mark.value === val)!.label);

  return (
    <Input.Wrapper labelElement="div" label={getControlLabel(local.prop)} {...others}>
      <Slider
        value={_value()}
        onChange={handleChange}
        label={(val) => MARKS.find((mark) => mark.value === val)!.label}
        step={25}
        marks={MARKS}
        styles={{ markLabel: { display: 'none' } }}
        thumbLabel="Size"
      />
    </Input.Wrapper>
  );
}
