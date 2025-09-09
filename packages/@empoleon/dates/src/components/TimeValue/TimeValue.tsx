import { mergeProps } from 'solid-js';
import type { TimePickerAmPmLabels, TimePickerFormat } from '../TimePicker';
import { getFormattedTime } from './get-formatted-time/get-formatted-time';

export interface TimeValueProps {
  /** Time to format */
  value: string | Date;

  /** Time format, `'24h'` by default */
  format?: TimePickerFormat;

  /** AM/PM labels, `{ am: 'AM', pm: 'PM' }` by default */
  amPmLabels?: TimePickerAmPmLabels;

  /** Determines whether seconds should be displayed, `false` by default */
  withSeconds?: boolean;
}

export function TimeValue(props: TimeValueProps) {
  const merged = mergeProps(
    {
      format: '24h' as TimePickerFormat,
      amPmLabels: { am: 'AM', pm: 'PM' } as TimePickerAmPmLabels,
      withSeconds: false,
    },
    props
  );

  return <>
    {getFormattedTime({
      value: merged.value,
      format: merged.format,
      amPmLabels: merged.amPmLabels,
      withSeconds: merged.withSeconds
    })}
  </>;
}

TimeValue.displayName = '@empoleon/dates/TimeValue';
