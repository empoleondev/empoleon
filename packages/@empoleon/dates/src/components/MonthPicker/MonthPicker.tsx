import { JSX, splitProps } from 'solid-js';
import {
  BoxProps,
  ElementProps,
  EmpoleonComponentStaticProperties,
  factory,
  Factory,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
} from '@empoleon/core';
import { useDatesState } from '../../hooks';
import { CalendarLevel, DatePickerType, DateStringValue, PickerBaseProps } from '../../types';
import { Calendar, CalendarBaseProps } from '../Calendar';
import { DecadeLevelBaseSettings } from '../DecadeLevel';
import { DecadeLevelGroupStylesNames } from '../DecadeLevelGroup';
import { YearLevelBaseSettings } from '../YearLevel';
import { YearLevelGroupStylesNames } from '../YearLevelGroup';

export type MonthPickerStylesNames = DecadeLevelGroupStylesNames | YearLevelGroupStylesNames;

type MonthPickerLevel = Exclude<CalendarLevel, 'month'>;

export interface MonthPickerBaseProps<Type extends DatePickerType = 'default'>
  extends PickerBaseProps<Type>,
    DecadeLevelBaseSettings,
    YearLevelBaseSettings,
    Omit<CalendarBaseProps, 'onNextMonth' | 'onPreviousMonth' | 'hasNextLevel'> {
  /** Max level that user can go up to, `'decade'` by default */
  maxLevel?: CalendarLevel;

  /** Initial displayed level (uncontrolled) */
  defaultLevel?: CalendarLevel;

  /** Current displayed level (controlled) */
  level?: CalendarLevel;

  /** Called when level changes */
  onLevelChange?: (level: MonthPickerLevel) => void;
}

export interface MonthPickerProps<Type extends DatePickerType = 'default'>
  extends BoxProps,
    MonthPickerBaseProps<Type>,
    StylesApiProps<MonthPickerFactory>,
    ElementProps<'div', 'onChange' | 'value' | 'defaultValue'> {
  /** Called when month is selected */
  onMonthSelect?: (date: DateStringValue) => void;
}

export type MonthPickerFactory = Factory<{
  props: MonthPickerProps;
  ref: HTMLDivElement;
  stylesNames: MonthPickerStylesNames;
}>;

const defaultProps = {
  type: 'default',
} satisfies Partial<MonthPickerProps>;

type MonthPickerComponent = (<Type extends DatePickerType = 'default'>(
  props: MonthPickerProps<Type> & { ref?: HTMLDivElement | ((el: HTMLDivElement) => void) }
) => JSX.Element) & {
  displayName?: string;
} & EmpoleonComponentStaticProperties<MonthPickerFactory>;

export const MonthPicker: MonthPickerComponent = factory<MonthPickerFactory>((_props) => {
  const props = useProps('MonthPicker', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'styles',
    'vars',
    'type',
    'defaultValue',
    'value',
    'onChange',
    '__staticSelector',
    'getMonthControlProps',
    'allowSingleDateInRange',
    'allowDeselect',
    'onMouseLeave',
    'onMonthSelect',
    '__updateDateOnMonthSelect',
    'onLevelChange',
    'ref',
  ]);

  const dateState = useDatesState({
    type: local.type as any,
    level: 'month',
    allowDeselect: local.allowDeselect,
    allowSingleDateInRange: local.allowSingleDateInRange,
    value: local.value,
    defaultValue: local.defaultValue,
    onChange: local.onChange as any,
    onMouseLeave: local.onMouseLeave,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<MonthPickerFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  return (
    <Calendar
      ref={local.ref}
      minLevel="year"
      __updateDateOnMonthSelect={local.__updateDateOnMonthSelect ?? false}
      __staticSelector={local.__staticSelector || 'MonthPicker'}
      onMouseLeave={dateState.onRootMouseLeave}
      onMonthMouseEnter={(_event, date) => dateState.onHoveredDateChange(date)}
      onMonthSelect={(date) => {
        dateState.onDateChange(date);
        local.onMonthSelect?.(date);
      }}
      getMonthControlProps={(date) => ({
        ...dateState.getControlProps(date),
        ...local.getMonthControlProps?.(date),
      })}
      classNames={resolvedClassNames}
      styles={resolvedStyles}
      onLevelChange={local.onLevelChange as any}
      {...others}
    />
  );
}) as any;

MonthPicker.classes = Calendar.classes;
MonthPicker.displayName = '@empoleon/dates/MonthPicker';
