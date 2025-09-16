import { BoxProps, ElementProps, Switch } from '@empoleon/core';
import { getControlLabel } from './get-control-label';
import { ConfiguratorControl } from './types';
import { splitProps } from 'solid-js';

export type ConfiguratorBooleanControlOptions = ConfiguratorControl<
  'boolean',
  { initialValue: boolean }
>;

export interface ConfiguratorBooleanControlProps
  extends BoxProps,
    ElementProps<'input', 'onChange' | 'value' | 'size'> {
  value: boolean;
  onChange: (value: boolean) => void;
  prop: string;
}

export function ConfiguratorBooleanControl(props: ConfiguratorBooleanControlProps) {
  const [local, others] = splitProps(props, [
    'value',
    'onChange',
    'prop'
  ]);

  return (
    <Switch
      checked={local.value}
      onChange={(event) => local.onChange(event.currentTarget.checked)}
      label={getControlLabel(local.prop)}
      {...others}
    />
  );
}
