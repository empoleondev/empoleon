import { splitProps } from 'solid-js';
import { BoxProps, ElementProps, TextInput } from '@empoleon/core';
import { getControlLabel } from './get-control-label';
import { ConfiguratorControl } from './types';

export type ConfiguratorStringControlOptions = ConfiguratorControl<
  'string',
  { initialValue: string }
>;

export interface ConfiguratorStringControlProps
  extends BoxProps,
    ElementProps<'input', 'onChange' | 'value' | 'size'> {
  value: string;
  onChange: (value: string) => void;
  prop: string;
}

export function ConfiguratorStringControl(props: ConfiguratorStringControlProps) {
  const [local, others] = splitProps(props, ['value', 'onChange', 'prop']);

  return (
    <TextInput
      value={local.value}
      onChange={(event) => local.onChange(event.currentTarget.value)}
      label={getControlLabel(local.prop)}
      placeholder="Enter prop value"
      {...others}
    />
  );
}
