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
import { CalendarStylesNames, pickCalendarProps } from '../Calendar';
import { DatePicker, DatePickerBaseProps } from '../DatePicker';
import { DateInputSharedProps, PickerInputBase } from '../PickerInputBase';

export type DatePickerInputStylesNames = __InputStylesNames | 'placeholder' | CalendarStylesNames;

export interface DatePickerInputProps<Type extends DatePickerType = 'default'>
  extends BoxProps,
    DateInputSharedProps,
    DatePickerBaseProps<Type>,
    StylesApiProps<DatePickerInputFactory> {
  /** dayjs format for input value, `"MMMM D, YYYY"` by default  */
  valueFormat?: string;
}

export type DatePickerInputFactory = Factory<{
  props: DatePickerInputProps;
  ref: HTMLButtonElement;
  stylesNames: DatePickerInputStylesNames;
  variant: InputVariant;
}>;

const defaultProps: Partial<DatePickerInputProps> = {
  type: 'default',
  valueFormat: 'MMMM D, YYYY',
  closeOnChange: true,
  sortDates: true,
  dropdownType: 'popover',
};

type DatePickerInputComponent = (<Type extends DatePickerType = 'default'>(
  props: DatePickerInputProps<Type> & { ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void) }
) => JSX.Element) & {
  displayName?: string;
} & EmpoleonComponentStaticProperties<DatePickerInputFactory>;

export const DatePickerInput: DatePickerInputComponent = factory<DatePickerInputFactory>(_props => {
  const props = useProps('DatePickerInput', defaultProps, _props);
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
    'defaultDate',
    'valueFormatter',
    'ref'
  ]);

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<DatePickerInputFactory>({
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

  const _defaultDate = Array.isArray(_value) ? _value[0] || local.defaultDate : _value || local.defaultDate;

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
      __staticSelector="DatePickerInput"
    >
      <DatePicker
        {...calendarProps}
        size={local.size}
        variant={local.variant}
        type={local.type}
        value={_value()}
        defaultDate={_defaultDate || getDefaultClampedDate({ maxDate: local.maxDate, minDate: local.minDate })}
        onChange={setValue}
        locale={local.locale}
        classNames={resolvedClassNames}
        styles={resolvedStyles}
        unstyled={local.unstyled}
        __staticSelector="DatePickerInput"
        __stopPropagation={local.dropdownType === 'popover'}
        minDate={local.minDate}
        maxDate={local.maxDate}
      />
    </PickerInputBase>
  );
}) as any;

DatePickerInput.classes = { ...PickerInputBase.classes, ...DatePicker.classes };
DatePickerInput.displayName = '@empoleon/dates/DatePickerInput';
