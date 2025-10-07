import { splitProps } from 'solid-js';
import { BoxProps, ElementProps, Input, Slider } from '@empoleon/core';
import { getControlLabel } from './get-control-label';
import { ConfiguratorControl } from './types';

export type ConfiguratorNumberControlOptions = ConfiguratorControl<
  'number',
  { initialValue: number; min?: number; max?: number; step?: number }
>;

export interface ConfiguratorNumberControlProps extends BoxProps, ElementProps<'div', 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  prop: string;
  step?: number;
  min?: number;
  max?: number;
}

export function ConfiguratorNumberControl(props: ConfiguratorNumberControlProps) {
  const [local, others] = splitProps(props, ['value', 'onChange', 'prop', 'step', 'min', 'max']);

  return (
    <Input.Wrapper labelElement="div" label={getControlLabel(local.prop)} {...others}>
      <Slider
        value={local.value}
        onChange={local.onChange}
        step={local.step}
        min={local.min}
        max={local.max}
        thumbLabel="Size"
      />
    </Input.Wrapper>
  );
}
