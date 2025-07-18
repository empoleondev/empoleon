import { JSX, splitProps } from 'solid-js';
import {
  __InputStylesNames,
  BoxProps,
  factory,
  Factory,
  InputVariant,
  EmpoleonComponentStaticProperties,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
} from '@empoleon/core';
import { useDatesInput } from '../../hooks';
import { DatePickerType } from '../../types';
import { getDefaultClampedDate } from '../../utils';
import { pickCalendarProps } from '../Calendar';
import { MonthPicker, MonthPickerBaseProps, MonthPickerStylesNames } from '../MonthPicker';
import { DateInputSharedProps, PickerInputBase } from '../PickerInputBase';

export type MonthPickerInputStylesNames =
  | __InputStylesNames
  | 'placeholder'
  | MonthPickerStylesNames;

export interface MonthPickerInputProps<Type extends DatePickerType = 'default'>
  extends BoxProps,
    DateInputSharedProps,
    MonthPickerBaseProps<Type>,
    StylesApiProps<MonthPickerInputFactory> {
  /** dayjs format for input value, `"MMMM YYYY"` by default  */
  valueFormat?: string;
}

export type MonthPickerInputFactory = Factory<{
  props: MonthPickerInputProps;
  ref: HTMLButtonElement;
  stylesNames: MonthPickerInputStylesNames;
  variant: InputVariant;
}>;

const defaultProps: Partial<MonthPickerInputProps> = {
  type: 'default',
  valueFormat: 'MMMM YYYY',
  closeOnChange: true,
  sortDates: true,
  dropdownType: 'popover',
};

type MonthPickerInputComponent = (<Type extends DatePickerType = 'default'>(
  props: MonthPickerInputProps<Type> & { ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void) }
) => JSX.Element) & {
  displayName?: string;
} & EmpoleonComponentStaticProperties<MonthPickerInputFactory>;

export const MonthPickerInput: MonthPickerInputComponent = factory<MonthPickerInputFactory>(_props => {
  const props = useProps('MonthPickerInput', defaultProps, _props);
  const [local, rest] = splitProps(props, [
    'type',
    'value',
    'defaultValue',
    'onChange',
    'valueFormat',
    'labelSeparator',
    'locale',
    'classNames',
    'styles',
    'unstyled',
    'closeOnChange',
    'size',
    'variant',
    'dropdownType',
    'sortDates',
    'minDate',
    'maxDate',
    'vars',
    'valueFormatter',
    'ref'
  ]);

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<MonthPickerInputFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  const { calendarProps, others } = pickCalendarProps(rest);

  const {
    _value,
    setValue,
    formattedValue,
    dropdownHandlers,
    dropdownOpened,
    onClear,
    shouldClear,
  } = useDatesInput({
    type: local.type as any,
    value: local.value,
    defaultValue: local.defaultValue,
    onChange: local.onChange as any,
    locale: local.locale,
    format: local.valueFormat,
    labelSeparator: local.labelSeparator,
    closeOnChange: local.closeOnChange,
    sortDates: local.sortDates,
    valueFormatter: local.valueFormatter,
  });

  return (
    <PickerInputBase
      formattedValue={formattedValue}
      dropdownOpened={dropdownOpened()}
      dropdownHandlers={dropdownHandlers}
      classNames={resolvedClassNames}
      styles={resolvedStyles}
      unstyled={local.unstyled}
      ref={local.ref}
      onClear={onClear}
      shouldClear={shouldClear}
      value={_value()}
      size={local.size!}
      variant={local.variant}
      dropdownType={local.dropdownType}
      {...others}
      type={local.type as any}
      __staticSelector="MonthPickerInput"
    >
      <MonthPicker
        {...calendarProps}
        size={local.size}
        variant={local.variant}
        type={local.type}
        value={_value()}
        defaultDate={
          calendarProps.defaultDate ||
          (Array.isArray(_value)
            ? _value[0] || getDefaultClampedDate({ maxDate: local.maxDate, minDate: local.minDate })
            : _value || getDefaultClampedDate({ maxDate: local.maxDate, minDate: local.minDate }))
        }
        onChange={setValue}
        locale={local.locale}
        classNames={resolvedClassNames}
        styles={resolvedStyles}
        unstyled={local.unstyled}
        __staticSelector="MonthPickerInput"
        __stopPropagation={local.dropdownType === 'popover'}
        minDate={local.minDate}
        maxDate={local.maxDate}
      />
    </PickerInputBase>
  );
}) as any;

MonthPickerInput.classes = { ...PickerInputBase.classes, ...MonthPicker.classes };
MonthPickerInput.displayName = '@empoleon/dates/MonthPickerInput';
