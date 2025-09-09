import { TimePickerAmPmLabels, TimePickerFormat } from '../../TimePicker.types';
import { splitTimeString } from '../split-time-string/split-time-string';

interface GetParsedTimeInput {
  time: string;
  format: TimePickerFormat;
  amPmLabels: TimePickerAmPmLabels;
}

interface ConvertTimeTo12HourFormatInput {
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
  amPmLabels: TimePickerAmPmLabels;
}

export function convertTimeTo12HourFormat(props: ConvertTimeTo12HourFormatInput) {
  if (props.hours === null) {
    return { hours: null, minutes: null, seconds: null, amPm: null };
  }

  const amPm = props.hours >= 12 ? props.amPmLabels.pm : props.amPmLabels.am;
  const hour12 = props.hours % 12 === 0 ? 12 : props.hours % 12;

  return {
    hours: hour12,
    minutes: typeof props.minutes === 'number' ? props.minutes : null,
    seconds: typeof props.seconds === 'number' ? props.seconds : null,
    amPm,
  };
}

export function getParsedTime(props: GetParsedTimeInput) {
  if (props.time === '') {
    return { hours: null, minutes: null, seconds: null, amPm: null };
  }

  const { hours, minutes, seconds } = splitTimeString(props.time);

  const parsed = { hours, minutes, seconds };

  if (props.format === '12h') {
    return convertTimeTo12HourFormat({ ...parsed, amPmLabels: props.amPmLabels });
  }

  return { ...parsed, amPm: null };
}
