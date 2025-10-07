import { splitProps } from 'solid-js';
import { BoxProps, ElementProps, Textarea } from '@empoleon/core';
import { getControlLabel } from './get-control-label';
import { ConfiguratorControl } from './types';

export type ConfiguratorTextareaControlOptions = ConfiguratorControl<
  'textarea',
  { initialValue: string }
>;

export interface ConfiguratorTextareaControlProps
  extends BoxProps,
    ElementProps<'textarea', 'onChange' | 'value' | 'size'> {
  value: string;
  onChange: (value: string) => void;
  prop: string;
}

export function ConfiguratorTextareaControl(props: ConfiguratorTextareaControlProps) {
  const [local, others] = splitProps(props, ['value', 'onChange', 'prop']);

  return (
    <Textarea
      value={local.value}
      onChange={(event) => local.onChange(event.currentTarget.value)}
      label={getControlLabel(local.prop)}
      placeholder="Enter prop value"
      autosize
      minRows={2}
      maxRows={6}
      {...others}
    />
  );
}
