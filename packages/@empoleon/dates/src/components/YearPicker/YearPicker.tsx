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
import { DatePickerType, DateStringValue, PickerBaseProps } from '../../types';
import { Calendar, CalendarBaseProps } from '../Calendar';
import { DecadeLevelBaseSettings } from '../DecadeLevel';
import { DecadeLevelGroupStylesNames } from '../DecadeLevelGroup';

export type YearPickerStylesNames = DecadeLevelGroupStylesNames;

export interface YearPickerBaseProps<Type extends DatePickerType = 'default'>
  extends PickerBaseProps<Type>,
    DecadeLevelBaseSettings,
    Omit<
      CalendarBaseProps,
      'onNextYear' | 'onPreviousYear' | 'onNextMonth' | 'onPreviousMonth' | 'hasNextLevel'
    > {}

export interface YearPickerProps<Type extends DatePickerType = 'default'>
  extends BoxProps,
    YearPickerBaseProps<Type>,
    StylesApiProps<YearPickerFactory>,
    ElementProps<'div', 'onChange' | 'value' | 'defaultValue'> {
  /** Called when year is selected */
  onYearSelect?: (date: DateStringValue) => void;
}

export type YearPickerFactory = Factory<{
  props: YearPickerProps;
  ref: HTMLDivElement;
  stylesNames: YearPickerStylesNames;
}>;

const defaultProps = {
  type: 'default',
} satisfies Partial<YearPickerProps>;

type YearPickerComponent = (<Type extends DatePickerType = 'default'>(
  props: YearPickerProps<Type> & { ref?: HTMLDivElement | ((el: HTMLDivElement) => void) }
) => JSX.Element) & {
  displayName?: string;
} & EmpoleonComponentStaticProperties<YearPickerFactory>;

export const YearPicker: YearPickerComponent = factory<YearPickerFactory>(_props => {
  const props = useProps('YearPicker', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'styles',
    'vars',
    'type',
    'defaultValue',
    'value',
    'onChange',
    '__staticSelector',
    'getYearControlProps',
    'allowSingleDateInRange',
    'allowDeselect',
    'onMouseLeave',
    'onYearSelect',
    '__updateDateOnYearSelect',
    'ref'
  ]);

  const { onDateChange, onRootMouseLeave, onHoveredDateChange, getControlProps } = useDatesState({
    type: local.type as any,
    level: 'year',
    allowDeselect: local.allowDeselect,
    allowSingleDateInRange: local.allowSingleDateInRange,
    value: local.value,
    defaultValue: local.defaultValue,
    onChange: local.onChange as any,
    onMouseLeave: local.onMouseLeave,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<YearPickerFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  return (
    <Calendar
      ref={local.ref}
      minLevel="decade"
      __updateDateOnYearSelect={local.__updateDateOnYearSelect ?? false}
      __staticSelector={local.__staticSelector || 'YearPicker'}
      onMouseLeave={onRootMouseLeave}
      onYearMouseEnter={(_event, date) => onHoveredDateChange(date)}
      onYearSelect={(date) => {
        onDateChange(date);
        local.onYearSelect?.(date);
      }}
      getYearControlProps={(date) => ({
        ...getControlProps(date),
        ...local.getYearControlProps?.(date),
      })}
      classNames={resolvedClassNames}
      styles={resolvedStyles}
      {...others}
    />
  );
}) as any;

YearPicker.classes = Calendar.classes;
YearPicker.displayName = '@empoleon/dates/YearPicker';
