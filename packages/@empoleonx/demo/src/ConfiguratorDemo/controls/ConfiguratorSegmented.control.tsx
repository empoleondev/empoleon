import { BoxProps, ElementProps, Input, SegmentedControl } from '@empoleon/core';
import { getControlLabel } from './get-control-label';
import { SelectData, transformSelectData } from './transform-select-data';
import { ConfiguratorControl } from './types';
import { mergeProps, splitProps } from 'solid-js';

export type ConfiguratorSegmentedControlOptions = ConfiguratorControl<
  'segmented',
  { data: SelectData; initialValue: string }
>;

export interface ConfiguratorSegmentedControlProps
  extends BoxProps,
    ElementProps<'div', 'onChange'> {
  data: SelectData;
  value: string;
  onChange: (value: string) => void;
  prop: string;
  transformLabel?: boolean;
}

export function ConfiguratorSegmentedControl(props: ConfiguratorSegmentedControlProps) {
  const [local, others] = splitProps(mergeProps({
    ...props,
    transformLabel: true,
  }), [
    'data',
    'value',
    'onChange',
    'prop',
    'transformLabel'
  ]);

  return (
    <Input.Wrapper labelElement="div" label={getControlLabel(local.prop)} {...others}>
      <SegmentedControl
        data={local.transformLabel ? transformSelectData(local.data) : local.data}
        value={local.value}
        onChange={local.onChange}
        fullWidth
        transitionDuration={150}
      />
    </Input.Wrapper>
  );
}
