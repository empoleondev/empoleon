import { ScrollArea, SimpleGrid } from '@empoleon/core';
import { useTimePickerContext } from '../TimePicker.context';
import {
  TimePickerAmPmLabels,
  TimePickerFormat,
  TimePickerPresetGroup,
  TimePickerPresets,
} from '../TimePicker.types';
import { isSameTime } from '../utils/is-same-time/is-same-time';
import { TimePresetControl } from './TimePresetControl';
import { TimePresetGroup } from './TimePresetGroup';
import { For } from 'solid-js';

interface TimePresetsProps {
  presets: TimePickerPresets;
  format: TimePickerFormat;
  amPmLabels: TimePickerAmPmLabels;
  value: string;
  withSeconds: boolean;
  onChange: (value: string) => void;
}

export function TimePresets({
  presets,
  format,
  amPmLabels,
  withSeconds,
  value,
  onChange,
}: TimePresetsProps) {
  const ctx = useTimePickerContext();

  if (presets.length === 0) {
    return null;
  }

  if (typeof presets[0] === 'string') {
    return (
      <ScrollArea.Autosize
        mah={ctx.maxDropdownContentHeight}
        type="never"
        {...ctx.getStyles('scrollarea')}
        {...ctx.scrollAreaProps}
      >
        <div {...ctx.getStyles('presetsRoot')}>
          <SimpleGrid cols={withSeconds ? 2 : 3} spacing={4}>
            <For each={presets as string[]}>
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
      </ScrollArea.Autosize>
    );
  }

  return (
    <ScrollArea.Autosize
      mah={ctx.maxDropdownContentHeight}
      type="never"
      {...ctx.getStyles('scrollarea')}
      {...ctx.scrollAreaProps}
    >
      <div {...ctx.getStyles('presetsRoot')}>
        <For each={presets as TimePickerPresetGroup[]}>
          {(group, index) => (
            <TimePresetGroup
              data={group}
              value={value}
              format={format}
              amPmLabels={amPmLabels}
              withSeconds={withSeconds}
              onChange={onChange}
            />
          )}
        </For>
      </div>
    </ScrollArea.Autosize>
  );
}

TimePresets.displayName = '@empoleon/dates/TimePresets';
