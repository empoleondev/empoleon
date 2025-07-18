import { SimpleGrid } from '@empoleon/core';
import { useTimePickerContext } from '../TimePicker.context';
import { TimePickerAmPmLabels, TimePickerFormat, TimePickerPresetGroup } from '../TimePicker.types';
import { isSameTime } from '../utils/is-same-time/is-same-time';
import { TimePresetControl } from './TimePresetControl';
import { For } from 'solid-js';

interface TimePresetGroupProps {
  value: string;
  data: TimePickerPresetGroup;
  onChange: (value: string) => void;
  format: TimePickerFormat;
  amPmLabels: TimePickerAmPmLabels;
  withSeconds: boolean;
}

export function TimePresetGroup({
  value,
  data,
  onChange,
  format,
  amPmLabels,
  withSeconds,
}: TimePresetGroupProps) {
  const ctx = useTimePickerContext();

  return (
    <div {...ctx.getStyles('presetsGroup')}>
      <div {...ctx.getStyles('presetsGroupLabel')}>{data.label}</div>
      <SimpleGrid cols={withSeconds ? 2 : 3} spacing={4}>
        <For each={data.values}>
          {(item) => (
            <TimePresetControl
              value={item}
              format={format}
              amPmLabels={amPmLabels}
              withSeconds={withSeconds}
              active={isSameTime({ time: item, compare: value, withSeconds })}
              onChange={onChange}
            />
          )}
        </For>
      </SimpleGrid>
    </div>
  );
}

TimePresetGroup.displayName = '@empoleon/dates/TimePresetGroup';
