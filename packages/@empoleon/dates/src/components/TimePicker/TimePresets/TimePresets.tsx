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

export function TimePresets(props: TimePresetsProps) {
  const ctx = useTimePickerContext();

  if (props.presets.length === 0) {
    return null;
  }

  if (typeof props.presets[0] === 'string') {
    return (
      <ScrollArea.Autosize
        mah={ctx.maxDropdownContentHeight}
        type="never"
        {...ctx.getStyles('scrollarea')}
        {...ctx.scrollAreaProps}
      >
        <div {...ctx.getStyles('presetsRoot')}>
          <SimpleGrid cols={props.withSeconds ? 2 : 3} spacing={4}>
            <For each={props.presets as string[]}>
              {item => (
                <TimePresetControl
                  value={item}
                  format={props.format}
                  amPmLabels={props.amPmLabels}
                  withSeconds={props.withSeconds}
                  active={isSameTime({ time: item, compare: props.value, withSeconds: props.withSeconds })}
                  onChange={props.onChange}
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
        <For each={props.presets as TimePickerPresetGroup[]}>
          {group => (
            <TimePresetGroup
              data={group}
              value={props.value}
              format={props.format}
              amPmLabels={props.amPmLabels}
              withSeconds={props.withSeconds}
              onChange={props.onChange}
            />
          )}
        </For>
      </div>
    </ScrollArea.Autosize>
  );
}

TimePresets.displayName = '@empoleon/dates/TimePresets';
