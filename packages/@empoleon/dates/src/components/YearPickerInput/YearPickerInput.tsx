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
import { DateInputSharedProps, PickerInputBase } from '../PickerInputBase';
import { YearPicker, YearPickerBaseProps, YearPickerStylesNames } from '../YearPicker';

export type YearPickerInputStylesNames = __InputStylesNames | 'placeholder' | YearPickerStylesNames;

export interface YearPickerInputProps<Type extends DatePickerType = 'default'>
  extends BoxProps,
    DateInputSharedProps,
    YearPickerBaseProps<Type>,
    StylesApiProps<YearPickerInputFactory> {
  /** day format to display input value, `"YYYY"` by default  */
  valueFormat?: string;
}

export type YearPickerInputFactory = Factory<{
  props: YearPickerInputProps;
  ref: HTMLButtonElement;
  stylesNames: YearPickerInputStylesNames;
  variant: InputVariant;
}>;

const defaultProps = {
  type: 'default',
  valueFormat: 'YYYY',
  closeOnChange: true,
  sortDates: true,
  dropdownType: 'popover',
} satisfies Partial<YearPickerInputProps>;

type YearPickerInputComponent = (<Type extends DatePickerType = 'default'>(
  props: YearPickerInputProps<Type> & { ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void) }
) => JSX.Element) & {
  displayName?: string;
} & EmpoleonComponentStaticProperties<YearPickerInputFactory>;

export const YearPickerInput: YearPickerInputComponent = factory<YearPickerInputFactory>(_props => {
  const props = useProps('YearPickerInput', defaultProps, _props);
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
    'attributes',
    'ref'
  ]);

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<YearPickerInputFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  const { calendarProps, others } = pickCalendarProps(rest);

  const datesInput = useDatesInput({
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
      formattedValue={datesInput.formattedValue()}
      dropdownOpened={datesInput.dropdownOpened()}
      dropdownHandlers={datesInput.dropdownHandlers}
      classNames={resolvedClassNames}
      styles={resolvedStyles}
      unstyled={local.unstyled}
      ref={local.ref}
      onClear={datesInput.onClear}
      shouldClear={datesInput.shouldClear}
      value={datesInput._value()}
      size={local.size!}
      variant={local.variant}
      dropdownType={local.dropdownType}
      {...others}
      type={local.type as any}
      __staticSelector="YearPickerInput"
      attributes={local.attributes}
    >
      <YearPicker
        {...calendarProps}
        size={local.size}
        variant={local.variant}
        type={local.type}
        value={datesInput._value()}
        defaultDate={
          calendarProps.defaultDate ||
          (Array.isArray(datesInput._value())
            ? datesInput._value()[0] || getDefaultClampedDate({ maxDate: local.maxDate, minDate: local.minDate })
            : datesInput._value() || getDefaultClampedDate({ maxDate: local.maxDate, minDate: local.minDate }))
        }
        onChange={datesInput.setValue}
        locale={local.locale}
        classNames={resolvedClassNames}
        styles={resolvedStyles}
        unstyled={local.unstyled}
        __staticSelector="YearPickerInput"
        __stopPropagation={local.dropdownType === 'popover'}
        minDate={local.minDate}
        maxDate={local.maxDate}
        attributes={local.attributes}
      />
    </PickerInputBase>
  );
}) as any;

YearPickerInput.classes = { ...PickerInputBase.classes, ...YearPicker.classes };
YearPickerInput.displayName = '@empoleon/dates/YearPickerInput';
