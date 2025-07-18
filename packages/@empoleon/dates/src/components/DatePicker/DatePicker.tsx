import { JSX, splitProps } from 'solid-js';
import {
  BoxProps,
  ElementProps,
  factory,
  Factory,
  EmpoleonComponentStaticProperties,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
} from '@empoleon/core';
import { useDatesState } from '../../hooks';
import { CalendarLevel, DatePickerType, PickerBaseProps } from '../../types';
import { Calendar, CalendarBaseProps, CalendarSettings, CalendarStylesNames } from '../Calendar';
import { DecadeLevelBaseSettings } from '../DecadeLevel';
import { MonthLevelBaseSettings } from '../MonthLevel';
import { YearLevelBaseSettings } from '../YearLevel';

export type DatePickerStylesNames = CalendarStylesNames;

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

const defaultProps: Partial<DatePickerProps> = {
  type: 'default',
  defaultLevel: 'month',
  numberOfColumns: 1,
};

type DatePickerComponent = (<Type extends DatePickerType = 'default'>(
  props: DatePickerProps<Type> & { ref?: HTMLDivElement | ((el: HTMLDivElement) => void) }
) => JSX.Element) & {
  displayName?: string;
} & EmpoleonComponentStaticProperties<DatePickerFactory>;

export const DatePicker: DatePickerComponent = factory<DatePickerFactory>(_props => {
  const props = useProps('DatePicker', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'styles',
    'vars',
    'type',
    'defaultValue',
    'value',
    'onChange',
    '__staticSelector',
    'getDayProps',
    'allowSingleDateInRange',
    'allowDeselect',
    'onMouseLeave',
    'numberOfColumns',
    'hideOutsideDates',
    '__onDayMouseEnter',
    '__onDayClick',
    'ref'
  ]);

  const { onDateChange, onRootMouseLeave, onHoveredDateChange, getControlProps } = useDatesState({
    type: local.type as any,
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

  return (
    <Calendar
      ref={local.ref}
      minLevel="month"
      classNames={resolvedClassNames}
      styles={resolvedStyles}
      __staticSelector={local.__staticSelector || 'DatePicker'}
      onMouseLeave={onRootMouseLeave}
      numberOfColumns={local.numberOfColumns}
      hideOutsideDates={local.hideOutsideDates ?? local.numberOfColumns !== 1}
      __onDayMouseEnter={(_event, date) => {
        onHoveredDateChange(date);
        local.__onDayMouseEnter?.(_event, date);
      }}
      __onDayClick={(_event, date) => {
        onDateChange(date);
        local.__onDayClick?.(_event, date);
      }}
      getDayProps={(date) => ({
        ...getControlProps(date),
        ...local.getDayProps?.(date),
      })}
      {...others}
    />
  );
}) as any;

DatePicker.classes = Calendar.classes;
DatePicker.displayName = '@empoleon/dates/DatePicker';
