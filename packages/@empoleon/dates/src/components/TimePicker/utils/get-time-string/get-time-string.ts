import { TimePickerAmPmLabels, TimePickerFormat } from '../../TimePicker.types';
import { padTime } from '../pad-time/pad-time';

interface Time12HourFormat {
  hours: number;
  minutes: number;
  seconds: number | null;
  withSeconds: boolean;
  amPm: string;
  amPmLabels: TimePickerAmPmLabels;
}

function convertTo24HourFormat(props: Time12HourFormat): string {
  let _hours = props.hours;

  if (props.amPm === props.amPmLabels.pm && props.hours !== 12) {
    _hours += 12;
  } else if (props.amPm === props.amPmLabels.am && props.hours === 12) {
    _hours = 0;
  }

  return `${padTime(_hours)}:${padTime(props.minutes)}${props.withSeconds ? `:${padTime(props.seconds || 0)}` : ''}`;
}

interface GetTimeStringInput {
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
  format: TimePickerFormat;
  withSeconds: boolean;
  amPm: string | null;
  amPmLabels: TimePickerAmPmLabels;
}

export function getTimeString(props: GetTimeStringInput) {
  if (props.hours === null || props.minutes === null) {
    return { valid: false, value: '' };
  }

  if (props.withSeconds && props.seconds === null) {
    return { valid: false, value: '' };
  }

  if (props.format === '24h') {
    const value = `${padTime(props.hours)}:${padTime(props.minutes)}${props.withSeconds ? `:${padTime(props.seconds!)}` : ''}`;
    return { valid: true, value };
  }

  if (props.amPm === null) {
    return { valid: false, value: '' };
  }

  return {
    valid: true,
    value: convertTo24HourFormat({
      hours: props.hours,
      minutes: props.minutes,
      seconds: props.seconds,
      amPm: props.amPm,
      amPmLabels: props.amPmLabels,
      withSeconds: props.withSeconds,
    }),
  };
}
