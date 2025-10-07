import { UnstyledButton } from '@empoleon/core';
import { TimeValue } from '../../TimeValue';
import { useTimePickerContext } from '../TimePicker.context';
import { TimePickerAmPmLabels, TimePickerFormat } from '../TimePicker.types';

interface TimePresetControlProps {
  value: string;
  active: boolean;
  onChange: (value: string) => void;
  format: TimePickerFormat;
  amPmLabels: TimePickerAmPmLabels;
  withSeconds: boolean;
}

export function TimePresetControl(props: TimePresetControlProps) {
  const ctx = useTimePickerContext();

  return (
    <UnstyledButton
      mod={{ active: props.active }}
      onClick={() => props.onChange(props.value)}
      {...ctx.getStyles('presetControl')}
    >
      <TimeValue
        withSeconds={props.withSeconds}
        value={props.value}
        format={props.format}
        amPmLabels={props.amPmLabels}
      />
    </UnstyledButton>
  );
}

TimePresetControl.displayName = '@empoleon/dates/TimePresetControl';
