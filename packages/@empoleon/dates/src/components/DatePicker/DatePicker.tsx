import dayjs from 'dayjs';
import { createSignal, For, JSX, Show, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  EmpoleonComponentStaticProperties,
  factory,
  Factory,
  getFontSize,
  StylesApiProps,
  UnstyledButton,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '@empoleon/core';
import { useDatesState } from '../../hooks';
import {
  CalendarLevel,
  DatePickerType,
  DateStringValue,
  DateValue,
  PickerBaseProps,
} from '../../types';
import {
  Calendar,
  CalendarBaseProps,
  CalendarSettings,
  CalendarStylesNames,
  pickCalendarProps,
} from '../Calendar';
import { DecadeLevelBaseSettings } from '../DecadeLevel';
import { isSameMonth } from '../Month';
import { MonthLevelBaseSettings } from '../MonthLevel';
import { YearLevelBaseSettings } from '../YearLevel';
import classes from './DatePicker.module.css';

export interface DatePickerPreset<Type extends DatePickerType> {
  value: Type extends 'range'
    ? [DateStringValue | null, DateStringValue | null]
    : DateStringValue | null;
  label: JSX.Element;
}

export type DatePickerCssVariables = {
  datePickerRoot: '--preset-font-size';
};

export type DatePickerStylesNames =
  | CalendarStylesNames
  | 'presetsList'
  | 'presetButton'
  | 'datePickerRoot';

export interface DatePickerBaseProps<Type extends DatePickerType = 'default'>
  extends PickerBaseProps<Type>,
    DecadeLevelBaseSettings,
    YearLevelBaseSettings,
    MonthLevelBaseSettings,
    CalendarBaseProps,
    Omit<CalendarSettings, 'hasNextLevel'> {
  /** Max level that user can go up to, `'decade'` by default */
  maxLevel?: CalendarLevel;

  /** Initial displayed level (uncontrolled) */
  defaultLevel?: CalendarLevel;

  /** Current displayed level (controlled) */
  level?: CalendarLevel;

  /** Called when level changes */
  onLevelChange?: (level: CalendarLevel) => void;

  /** Predefined values to pick from */
  presets?: DatePickerPreset<Type>[];

  /** If defined, called with preset value, suppresses `onChange` call */
  __onPresetSelect?: (
    preset: Type extends 'range'
      ? [DateStringValue | null, DateStringValue | null]
      : DateStringValue | null
  ) => void;
}

export interface DatePickerProps<Type extends DatePickerType = 'default'>
  extends BoxProps,
    DatePickerBaseProps<Type>,
    StylesApiProps<DatePickerFactory>,
    ElementProps<'div', 'onChange' | 'value' | 'defaultValue'> {}

export type DatePickerFactory = Factory<{
  props: DatePickerProps;
  ref: HTMLDivElement;
  stylesNames: DatePickerStylesNames;
}>;

const varsResolver = createVarsResolver<DatePickerFactory>((_, props) => ({
  datePickerRoot: {
    '--preset-font-size': getFontSize(props.size),
  },
}));

const defaultProps = {
  type: 'default',
  defaultLevel: 'month',
  numberOfColumns: 1,
} satisfies Partial<DatePickerProps>;

type DatePickerComponent = (<Type extends DatePickerType = 'default'>(
  props: DatePickerProps<Type> & { ref?: HTMLDivElement | ((el: HTMLDivElement) => void) }
) => JSX.Element) & {
  displayName?: string;
} & EmpoleonComponentStaticProperties<DatePickerFactory>;

export const DatePicker: DatePickerComponent = factory<DatePickerFactory>((_props) => {
  const props = useProps('DatePicker', defaultProps, _props);
  const [local, rest] = splitProps(props, [
    'allowDeselect',
    'allowSingleDateInRange',
    'value',
    'defaultValue',
    'onChange',
    'onMouseLeave',
    'classNames',
    'styles',
    '__staticSelector',
    '__onDayClick',
    '__onDayMouseEnter',
    '__onPresetSelect',
    '__stopPropagation',
    'presets',
    'className',
    'style',
    'unstyled',
    'size',
    'vars',
    'attributes',
    'ref',
  ]);

  const { calendarProps, others } = pickCalendarProps(rest);
  const [setDateRef, setSetDateRef] = createSignal<((date: DateValue) => void) | null>(null);
  const [setLevelRef, setSetLevelRef] = createSignal<((level: CalendarLevel) => void) | null>(null);

  const getStyles = useStyles<DatePickerFactory>({
    name: local.__staticSelector || 'DatePicker',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    rootSelector: local.presets ? 'datePickerRoot' : undefined,
    varsResolver,
    vars: local.vars,
  });

  const datesState = useDatesState({
    type: others.type as any,
    level: 'day',
    allowDeselect: local.allowDeselect,
    allowSingleDateInRange: local.allowSingleDateInRange,
    value: local.value,
    defaultValue: local.defaultValue,
    onChange: local.onChange as any,
    onMouseLeave: local.onMouseLeave,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<DatePickerFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  const calendar = (
    <Calendar
      ref={local.ref}
      classNames={resolvedClassNames}
      styles={resolvedStyles}
      __staticSelector={local.__staticSelector || 'DatePicker'}
      onMouseLeave={datesState.onRootMouseLeave}
      size={local.size}
      {...calendarProps}
      {...(!local.presets ? others : {})}
      __stopPropagation={local.__stopPropagation}
      __setDateRef={setSetDateRef}
      __setLevelRef={setSetLevelRef}
      minLevel={calendarProps.minLevel || 'month'}
      __onDayMouseEnter={(_event, date) => {
        datesState.onHoveredDateChange(date);
        local.__onDayMouseEnter?.(_event, date);
      }}
      __onDayClick={(_event, date) => {
        datesState.onDateChange(date);
        local.__onDayClick?.(_event, date);
      }}
      getDayProps={(date) => ({
        ...datesState.getControlProps(date),
        ...calendarProps.getDayProps?.(date),
      })}
      getMonthControlProps={(date) => ({
        selected:
          typeof datesState._value() === 'string' ? isSameMonth(date, datesState._value()) : false,
        ...calendarProps.getMonthControlProps?.(date),
      })}
      getYearControlProps={(date) => ({
        selected:
          typeof datesState._value() === 'string'
            ? dayjs(date).isSame(datesState._value(), 'year')
            : false,
        ...calendarProps.getYearControlProps?.(date),
      })}
      hideOutsideDates={calendarProps.hideOutsideDates ?? calendarProps.numberOfColumns !== 1}
      {...(!local.presets
        ? { className: local.className, style: local.style, attributes: local.attributes }
        : {})}
    />
  );

  const handlePresetSelect = (
    val: DateStringValue | null | [DateStringValue | null, DateStringValue | null]
  ) => {
    const _val = Array.isArray(val) ? val[0] : val;

    if (_val !== undefined) {
      setDateRef()?.(_val);
      setLevelRef()?.('month');
      local.__onPresetSelect ? local.__onPresetSelect(_val) : datesState.setValue(val);
    }
  };

  return (
    <Show when={local.presets} fallback={calendar}>
      <Box {...getStyles('datePickerRoot')} size={local.size} {...others}>
        <Box component="div" {...getStyles('presetsList')}>
          <For each={local.presets}>
            {(preset) => (
              <button
                onClick={() => handlePresetSelect(preset.value)}
                onMouseDown={(event) => event.preventDefault()}
                data-mantine-stop-propagation={local.__stopPropagation || undefined}
              >
                {preset.label}
              </button>
            )}
          </For>
        </Box>
        {calendar}
      </Box>
    </Show>
  );
}) as any;

DatePicker.classes = Calendar.classes;
DatePicker.displayName = '@empoleon/dates/DatePicker';
