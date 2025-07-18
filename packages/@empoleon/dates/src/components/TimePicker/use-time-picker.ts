import { createSignal, createEffect, createMemo } from 'solid-js';
import type {
  TimePickerAmPmLabels,
  TimePickerFormat,
  TimePickerPasteSplit,
} from './TimePicker.types';
import { clampTime } from './utils/clamp-time/clamp-time';
import { convertTimeTo12HourFormat, getParsedTime } from './utils/get-parsed-time/get-parsed-time';
import { getTimeString } from './utils/get-time-string/get-time-string';

interface UseTimePickerInput {
  value: string | undefined;
  defaultValue: string | undefined;
  onChange: ((value: string) => void) | undefined;
  format: TimePickerFormat;
  amPmLabels: TimePickerAmPmLabels;
  withSeconds: boolean | undefined;
  min: string | undefined;
  max: string | undefined;
  readOnly: boolean | undefined;
  disabled: boolean | undefined;
  clearable: boolean | undefined;
  pasteSplit: TimePickerPasteSplit | undefined;
}

export function useTimePicker(props: UseTimePickerInput) {
  const withSeconds = props.withSeconds || false;

  const parsedTime = getParsedTime({
    time: props.value || props.defaultValue || '',
    amPmLabels: props.amPmLabels,
    format: props.format,
  });

  let acceptChange = true;

  const [hours, setHours] = createSignal<number | null>(parsedTime.hours);
  const [minutes, setMinutes] = createSignal<number | null>(parsedTime.minutes);
  const [seconds, setSeconds] = createSignal<number | null>(parsedTime.seconds);
  const [amPm, setAmPm] = createSignal<string | null>(parsedTime.amPm);

  const isClearable =
    props.clearable &&
    !props.readOnly &&
    !props.disabled &&
    (hours !== null || minutes !== null || seconds !== null || amPm !== null);

  let hoursRef: HTMLInputElement | undefined;
  let minutesRef: HTMLInputElement | undefined;
  let secondsRef: HTMLInputElement | undefined;
  let amPmRef: HTMLSelectElement | undefined;

  const focus = (field: 'hours' | 'minutes' | 'seconds' | 'amPm') => {
    if (field === 'hours') {
      hoursRef?.focus();
    }

    if (field === 'minutes') {
      minutesRef?.focus();
    }

    if (field === 'seconds') {
      secondsRef?.focus();
    }

    if (field === 'amPm') {
      amPmRef?.focus();
    }
  };

  const handleTimeChange = (field: 'hours' | 'minutes' | 'seconds' | 'amPm', val: any) => {
    const computedValue = { hours: hours(), minutes: minutes(), seconds: seconds(), amPm: amPm(), [field]: val };

    const timeString = getTimeString({ ...computedValue, format: props.format, withSeconds, amPmLabels: props.amPmLabels });

    if (timeString.valid) {
      acceptChange = false;
      const clamped = clampTime(timeString.value, props.min || '00:00:00', props.max || '23:59:59');
      const converted =
        props.format === '12h'
          ? convertTimeTo12HourFormat({
              hours: clamped.hours,
              minutes: clamped.minutes,
              seconds: clamped.seconds,
              amPmLabels: props.amPmLabels,
            })
          : clamped;
      setHours(converted.hours);
      setMinutes(converted.minutes);
      setSeconds(converted.seconds);
      props.onChange?.(clamped.timeString);
    } else {
      acceptChange = false;
      if (typeof props.value === 'string' && props.value !== '') {
        props.onChange?.('');
      }
    }
  };

  const setTimeString = (timeString: string) => {
    acceptChange = false;

    const parsedTime = getParsedTime({ time: timeString, amPmLabels: props.amPmLabels, format: props.format });
    setHours(parsedTime.hours);
    setMinutes(parsedTime.minutes);
    setSeconds(parsedTime.seconds);
    setAmPm(parsedTime.amPm);

    props.onChange?.(timeString);
  };

  const onHoursChange = (value: number | null) => {
    setHours(value);
    handleTimeChange('hours', value);
    focus('hours');
  };

  const onMinutesChange = (value: number | null) => {
    setMinutes(value);
    handleTimeChange('minutes', value);
    focus('minutes');
  };

  const onSecondsChange = (value: number | null) => {
    setSeconds(value);
    handleTimeChange('seconds', value);
    focus('seconds');
  };

  const onAmPmChange = (value: string | null) => {
    setAmPm(value);
    handleTimeChange('amPm', value);
    focus('amPm');
  };

  const clear = () => {
    acceptChange = false;
    setHours(null);
    setMinutes(null);
    setSeconds(null);
    setAmPm(null);
    props.onChange?.('');
    focus('hours');
  };

  const onPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const pastedValue = event.clipboardData?.getData('text');
    if (!pastedValue) return;
    const parsedTime = (props.pasteSplit || getParsedTime)({ time: pastedValue, format: props.format, amPmLabels: props.amPmLabels });
    const timeString = getTimeString({ ...parsedTime, format: props.format, withSeconds, amPmLabels: props.amPmLabels });
    if (timeString.valid) {
      acceptChange = false;
      const clamped = clampTime(timeString.value, props.min || '00:00:00', props.max || '23:59:59');
      props.onChange?.(clamped.timeString);
      setHours(parsedTime.hours);
      setMinutes(parsedTime.minutes);
      setSeconds(parsedTime.seconds);
      setAmPm(parsedTime.amPm);
    }
  };

  const hiddenInputValue = getTimeString({
    hours: hours(),
    minutes: minutes(),
    seconds: seconds(),
    format: props.format,
    withSeconds,
    amPm: amPm(),
    amPmLabels: props.amPmLabels!,
  });

  createEffect(() => {
    if (acceptChange && typeof props.value === 'string') {
      const parsedTime = getParsedTime({ time: props.value || '', amPmLabels: props.amPmLabels, format: props.format });
      setHours(parsedTime.hours);
      setMinutes(parsedTime.minutes);
      setSeconds(parsedTime.seconds);
      setAmPm(parsedTime.amPm);
    }
    acceptChange = true;
  });

  return {
    refs: { hours: hoursRef, minutes: minutesRef, seconds: secondsRef, amPm: amPmRef },
    values: { hours, minutes, seconds, amPm },
    setHours: onHoursChange,
    setMinutes: onMinutesChange,
    setSeconds: onSecondsChange,
    setAmPm: onAmPmChange,
    focus,
    clear,
    onPaste,
    setTimeString,
    isClearable,
    hiddenInputValue: hiddenInputValue.value,
  };
}
