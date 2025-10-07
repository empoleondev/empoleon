import { For } from 'solid-js';
import { SimpleGrid } from '@empoleon/core';
import { useTimePickerContext } from '../TimePicker.context';
import { TimePickerAmPmLabels, TimePickerFormat, TimePickerPresetGroup } from '../TimePicker.types';
import { isSameTime } from '../utils/is-same-time/is-same-time';
import { TimePresetControl } from './TimePresetControl';

interface TimePresetGroupProps {
  value: string;
  data: TimePickerPresetGroup;
  onChange: (value: string) => void;
  format: TimePickerFormat;
  amPmLabels: TimePickerAmPmLabels;
  withSeconds: boolean;
}

export function TimePresetGroup(props: TimePresetGroupProps) {
  const ctx = useTimePickerContext();

  return (
    <div {...ctx.getStyles('presetsGroup')}>
      <div {...ctx.getStyles('presetsGroupLabel')}>{props.data.label}</div>
      <SimpleGrid cols={props.withSeconds ? 2 : 3} spacing={4}>
        <For each={props.data.values}>
          {(item) => (
            <TimePresetControl
              value={item}
              format={props.format}
              amPmLabels={props.amPmLabels}
              withSeconds={props.withSeconds}
              active={isSameTime({
                time: item,
                compare: props.value,
                withSeconds: props.withSeconds,
              })}
              onChange={props.onChange}
            />
          )}
        </For>
      </SimpleGrid>
    </div>
  );
}

TimePresetGroup.displayName = '@empoleon/dates/TimePresetGroup';
