import { createSignal, createMemo } from 'solid-js';
import { DatePickerType, DatePickerValue, DateStringValue } from '../../types';
import { toDateString, toDateTimeString } from '../../utils';

interface UseUncontrolledDates<Type extends DatePickerType = 'default'> {
  type: Type;
  value: DatePickerValue<Type> | undefined;
  defaultValue: DatePickerValue<Type> | undefined;
  onChange: ((value: DatePickerValue<Type, DateStringValue>) => void) | undefined;
  withTime?: boolean;
}

const getEmptyValue = <Type extends DatePickerType = 'default'>(type: Type) =>
  type === 'range' ? [null, null] : type === 'multiple' ? [] : null;

export const convertDatesValue = (value: any, withTime: boolean) => {
  const converter = withTime ? toDateTimeString : toDateString;
  return Array.isArray(value) ? value.map(converter) : converter(value);
};

export function useUncontrolledDates<Type extends DatePickerType = 'default'>({
  type,
  value,
  defaultValue,
  onChange,
  withTime = false,
}: UseUncontrolledDates<Type>) {
  let storedType = type;
  const controlled = value !== undefined;

  const initialValue = convertDatesValue(
    value !== undefined ? value :
    defaultValue !== undefined ? defaultValue :
    getEmptyValue(type),
    withTime
  );

  const [_value, _setValue] = createSignal<any>(initialValue);

  const finalValue = createMemo(() => {
    const currentValue = controlled ? convertDatesValue(value, withTime) : _value();

    if (storedType !== type) {
      storedType = type;

      if (!controlled) {
        const newValue = defaultValue !== undefined ? defaultValue : getEmptyValue(type);
        _setValue(convertDatesValue(newValue, withTime));
        return convertDatesValue(newValue, withTime);
      }
    }

    return currentValue;
  });

  const setValue = (newValue: any) => {
    const convertedValue = convertDatesValue(newValue, withTime);
    _setValue(convertedValue);
    onChange?.(convertedValue as DatePickerValue<Type, DateStringValue>);
  };

  return [finalValue, setValue, controlled] as const;
}
