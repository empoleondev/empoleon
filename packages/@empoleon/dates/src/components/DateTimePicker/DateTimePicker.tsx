import dayjs from 'dayjs';
import {
  ActionIcon,
  ActionIconProps,
  BoxProps,
  CheckIcon,
  factory,
  Factory,
  InputVariant,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '@empoleon/core';
import { useDisclosure, useMergedRef } from '@empoleon/hooks';
import { useUncontrolledDates } from '../../hooks';
import { CalendarLevel, DateStringValue, DateValue } from '../../types';
import { assignTime, clampDate } from '../../utils';
import {
  CalendarBaseProps,
  CalendarSettings,
  CalendarStylesNames,
  pickCalendarProps,
} from '../Calendar';
import { DatePicker } from '../DatePicker';
import { useDatesContext } from '../DatesProvider';
import {
  DateInputSharedProps,
  PickerInputBase,
  PickerInputBaseStylesNames,
} from '../PickerInputBase';
import { TimePicker, TimePickerProps } from '../TimePicker/TimePicker';
import { getMaxTime, getMinTime } from './get-min-max-time/get-min-max-time';
import classes from './DateTimePicker.module.css';
import { JSX } from 'solid-js';
import { createEffect, createSignal, splitProps } from 'solid-js';
import { DatePickerPreset } from '../DatePicker/DatePicker';

export type DateTimePickerStylesNames =
  | 'timeWrapper'
  | 'timeInput'
  | 'submitButton'
  | PickerInputBaseStylesNames
  | CalendarStylesNames;

export interface DateTimePickerProps
  extends BoxProps,
    Omit<
      DateInputSharedProps,
      'classNames' | 'styles' | 'closeOnChange' | 'size' | 'valueFormatter'
    >,
    CalendarBaseProps,
    Omit<CalendarSettings, 'onYearMouseEnter' | 'onMonthMouseEnter' | 'hasNextLevel'>,
    StylesApiProps<DateTimePickerFactory> {
  /** dayjs format for input value, `"DD/MM/YYYY HH:mm"` by default  */
  valueFormat?: string;

  /** Controlled component value */
  value?: DateValue;

  /** Uncontrolled component default value */
  defaultValue?: DateValue;

  /** Called when value changes */
  onChange?: (value: DateStringValue | null) => void;

  /** Default time value in `HH:mm` or `HH:mm:ss` format. Assigned to time when date is selected. */
  defaultTimeValue?: string;

  /** Props passed down to `TimePicker` component */
  timePickerProps?: Omit<TimePickerProps, 'defaultValue' | 'value'>;

  /** Props passed down to the submit button */
  submitButtonProps?: ActionIconProps & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

  /** Determines whether the seconds input should be displayed, `false` by default */
  withSeconds?: boolean;

  /** Max level that user can go up to, `'decade'` by default */
  maxLevel?: CalendarLevel;

  /** Presets values */
  presets?: DatePickerPreset<'default'>[];
}

export type DateTimePickerFactory = Factory<{
  props: DateTimePickerProps;
  ref: HTMLButtonElement;
  stylesNames: DateTimePickerStylesNames;
  variant: InputVariant;
}>;

const defaultProps = {
  dropdownType: 'popover',
} satisfies Partial<DateTimePickerProps>;

export const DateTimePicker = factory<DateTimePickerFactory>(_props => {
  const props = useProps('DateTimePicker', defaultProps, _props);
  const [local, rest] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'valueFormat',
    'locale',
    'classNames',
    'styles',
    'unstyled',
    'timePickerProps',
    'submitButtonProps',
    'withSeconds',
    'level',
    'defaultLevel',
    'size',
    'variant',
    'dropdownType',
    'vars',
    'minDate',
    'maxDate',
    'defaultDate',
    'defaultTimeValue',
    'presets',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<DateTimePickerFactory>({
    name: 'DateTimePicker',
    classes,
    props,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<DateTimePickerFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  const _valueFormat = local.valueFormat || (local.withSeconds ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY HH:mm');

  const [timePickerRef, setTimePickerRef] = createSignal<HTMLInputElement | null>(null);
  const timePickerRefMerged = useMergedRef(setTimePickerRef, local.timePickerProps?.hoursRef);

  const {
    calendarProps: { allowSingleDateInRange, ...calendarProps },
    others,
  } = pickCalendarProps(rest);

  const ctx = useDatesContext();
  const [_value, setValue] = useUncontrolledDates({
    type: 'default',
    value: local.value,
    defaultValue: local.defaultValue,
    onChange: local.onChange,
    withTime: true,
  });

  const formatTime = (dateValue: DateStringValue) =>
    dateValue ? dayjs(dateValue).format(local.withSeconds ? 'HH:mm:ss' : 'HH:mm') : '';

  const [timeValue, setTimeValue] = createSignal(formatTime(_value()!));
  const [currentLevel, setCurrentLevel] = createSignal(local.level || local.defaultLevel || 'month');

  const [dropdownOpened, dropdownHandlers] = useDisclosure(false);
  const formattedValue = _value()
    ? dayjs(_value()).locale(ctx.getLocale(local.locale)).format(_valueFormat)
    : '';

  const handleTimeChange = (timeString: string) => {
    local.timePickerProps?.onChange?.(timeString);
    setTimeValue(timeString);

    if (timeString) {
      setValue(assignTime(_value(), timeString));
    }
  };

  const handleDateChange = (date: DateValue) => {
    if (date) {
      setValue(assignTime(clampDate(local.minDate!, local.maxDate!, date!), timeValue()));
    }
    timePickerRef()?.focus();
  };

  const handleTimeInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      dropdownHandlers.close();
    }
  };

  createEffect(() => {
    if (!dropdownOpened()) {
      setTimeValue(formatTime(_value()!));
    }
  });

  createEffect(() => {
    if (dropdownOpened()) {
      setCurrentLevel('month');
    }
  });

  const __stopPropagation = local.dropdownType === 'popover';

  const handleDropdownClose = () => {
    const clamped = clampDate(local.minDate, local.maxDate, _value());
    if (_value && _value() !== clamped) {
      setValue(clampDate(local.minDate, local.maxDate, _value()));
    }
  };

  return (
    <PickerInputBase
      formattedValue={formattedValue}
      dropdownOpened={!rest.disabled ? dropdownOpened() : false}
      dropdownHandlers={dropdownHandlers}
      classNames={resolvedClassNames}
      styles={resolvedStyles}
      unstyled={local.unstyled}
      ref={local.ref}
      onClear={() => setValue(null)}
      shouldClear={!!_value()}
      value={_value()}
      size={local.size!}
      variant={local.variant}
      dropdownType={local.dropdownType}
      {...others}
      type="default"
      __staticSelector="DateTimePicker"
      onDropdownClose={handleDropdownClose}
      withTime
    >
      <DatePicker
        {...calendarProps}
        maxDate={local.maxDate}
        minDate={local.minDate}
        size={local.size}
        variant={local.variant}
        type="default"
        value={_value()}
        defaultDate={_value()!}
        onChange={handleDateChange}
        locale={local.locale}
        classNames={resolvedClassNames}
        styles={resolvedStyles}
        unstyled={local.unstyled}
        __staticSelector="DateTimePicker"
        __stopPropagation={__stopPropagation}
        level={local.level}
        defaultLevel={local.defaultLevel}
        onLevelChange={(_level) => {
          setCurrentLevel(_level);
          calendarProps.onLevelChange?.(_level);
        }}
        presets={local.presets}
        __onPresetSelect={(val) => {
          setValue(val);
          val && setTimeValue(formatTime(val));
        }}
        attributes={local.attributes}
      />

      {currentLevel() === 'month' && (
        <div {...getStyles('timeWrapper')}>
          <TimePicker
            value={timeValue()}
            withSeconds={local.withSeconds}
            unstyled={local.unstyled}
            min={getMinTime({ minDate: local.minDate, value: _value() })}
            max={getMaxTime({ maxDate: local.maxDate, value: _value() })}
            {...local.timePickerProps}
            {...getStyles('timeInput', {
              className: local.timePickerProps?.className,
              style: local.timePickerProps?.style,
            })}
            onChange={handleTimeChange}
            onKeyDown={handleTimeInputKeyDown}
            size={local.size}
            data-empoleon-stop-propagation={__stopPropagation || undefined}
            hoursRef={timePickerRefMerged}
            attributes={local.attributes}
          />

          <ActionIcon
            variant="default"
            size={`input-${local.size || 'sm'}`}
            {...getStyles('submitButton', {
              className: local.submitButtonProps?.className,
              style: local.submitButtonProps?.style,
            })}
            unstyled={local.unstyled}
            data-empoleon-stop-propagation={__stopPropagation || undefined}
            children={<CheckIcon size="30%" />}
            {...local.submitButtonProps}
            onClick={(event) => {
              const { onClick } = local.submitButtonProps || {};
              if (typeof onClick === 'function') {
                onClick(event);
              }

              dropdownHandlers.close();
              handleDropdownClose();
            }}
          />
        </div>
      )}
    </PickerInputBase>
  );
});

DateTimePicker.classes = { ...classes, ...PickerInputBase.classes, ...DatePicker.classes };
DateTimePicker.displayName = '@empoleon/dates/DateTimePicker';
