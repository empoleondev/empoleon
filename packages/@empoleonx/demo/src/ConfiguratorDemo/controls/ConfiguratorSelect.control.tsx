import { BoxProps, ElementProps, NativeSelect } from '@empoleon/core';
import { getControlLabel } from './get-control-label';
import { SelectData, transformSelectData } from './transform-select-data';
import { ConfiguratorControl } from './types';
import { splitProps } from 'solid-js';

export type ConfiguratorSelectControlOptions = ConfiguratorControl<
  'select',
  { data: SelectData; initialValue: string }
>;

export interface ConfiguratorSelectControlProps
  extends BoxProps,
    ElementProps<'select', 'onChange' | 'value' | 'size'> {
  value: string;
  data: SelectData;
  onChange: (value: string) => void;
  prop: string;
}

export function ConfiguratorSelectControl(props: ConfiguratorSelectControlProps) {
  const [local, others] = splitProps(props, [
    'value',
    'onChange',
    'prop',
    'data',
  ]);

  return (
    <NativeSelect
      value={local.value}
      onChange={(event) => local.onChange(event.currentTarget.value)}
      label={getControlLabel(local.prop)}
      data={transformSelectData(local.data)}
      {...others}
    />
  );
}
