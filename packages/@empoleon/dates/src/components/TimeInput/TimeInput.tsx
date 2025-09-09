import { JSX, splitProps } from 'solid-js';
import cx from 'clsx';
import {
  __BaseInputProps,
  __InputStylesNames,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  InputBase,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
} from '@empoleon/core';
import classes from './TimeInput.module.css';

export interface TimeInputProps
  extends BoxProps,
    __BaseInputProps,
    StylesApiProps<TimeInputFactory>,
    ElementProps<'input', 'size'> {
  /** Determines whether seconds input should be displayed, `false` by default */
  withSeconds?: boolean;

  /** Minimum possible string time, if `withSeconds` is true, time should be in format HH:mm:ss, otherwise HH:mm */
  minTime?: string;

  /** Maximum possible string time, if `withSeconds` is true, time should be in format HH:mm:ss, otherwise HH:mm */
  maxTime?: string;
}

export type TimeInputFactory = Factory<{
  props: TimeInputProps;
  ref: HTMLInputElement;
  stylesNames: __InputStylesNames;
}>;

const defaultProps: Partial<TimeInputProps> = {};

export const TimeInput = factory<TimeInputFactory>(_props => {
  const props = useProps('TimeInput', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'styles',
    'unstyled',
    'vars',
    'withSeconds',
    'minTime',
    'maxTime',
    'value',
    'onChange',
    'onBlur',
    'step',
    'ref'
  ]);

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<TimeInputFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  /**
   * Check if time is within limits or not
   * If the given value is within limits, return 0
   * If the given value is greater than the maxTime, return 1
   * If the given value is less than the minTime, return -1
   */
  const checkIfTimeLimitExceeded = (val: string) => {
    if (local.minTime !== undefined || local.maxTime !== undefined) {
      const [hours, minutes, seconds] = val.split(':').map(Number);

      if (local.minTime) {
        const [minHours, minMinutes, minSeconds] = local.minTime.split(':').map(Number);

        if (
          hours < minHours ||
          (hours === minHours && minutes < minMinutes) ||
          (local.withSeconds && hours === minHours && minutes === minMinutes && seconds < minSeconds)
        ) {
          return -1;
        }
      }

      if (local.maxTime) {
        const [maxHours, maxMinutes, maxSeconds] = local.maxTime.split(':').map(Number);

        if (
          hours > maxHours ||
          (hours === maxHours && minutes > maxMinutes) ||
          (local.withSeconds && hours === maxHours && minutes === maxMinutes && seconds > maxSeconds)
        ) {
          return 1;
        }
      }
    }

    return 0;
  };

  const onTimeBlur: JSX.FocusEventHandler<HTMLInputElement, FocusEvent> = (event) => {
    if (typeof local.onBlur === 'function') {
      local.onBlur(event);
    }

    const inputElement = event.currentTarget;
    const currentValue = inputElement.value;

    if (currentValue && (local.minTime !== undefined || local.maxTime !== undefined)) {
      const check = checkIfTimeLimitExceeded(currentValue);
      let correctedValue: string | undefined;

      if (check === 1) {
        correctedValue = local.maxTime;
      } else if (check === -1) {
        correctedValue = local.minTime;
      }

      if (correctedValue !== undefined && currentValue !== correctedValue) {
        inputElement.value = correctedValue;
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  return (
    <InputBase
      classNames={{ ...resolvedClassNames, input: cx(classes.input, resolvedClassNames?.input) }}
      styles={resolvedStyles}
      unstyled={local.unstyled}
      ref={local.ref}
      value={local.value}
      step={local.step ?? (local.withSeconds ? 1 : 60)}
      {...others}
      onChange={local.onChange}
      onBlur={onTimeBlur}
      type="time"
      __staticSelector="TimeInput"
    />
  );
});

TimeInput.classes = InputBase.classes;
TimeInput.displayName = '@empoleon/dates/TimeInput';
