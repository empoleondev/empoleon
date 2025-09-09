import { createSignal, createMemo, mergeProps } from 'solid-js';
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

export function useUncontrolledDates<Type extends DatePickerType = 'default'>(props: UseUncontrolledDates<Type>) {
  const mergedProps = mergeProps({
    withTime: false
  }, props);

  let storedType = props.type;
  const controlled = props.value !== undefined;

  const initialValue = convertDatesValue(
    props.value !== undefined ? props.value :
    props.defaultValue !== undefined ? props.defaultValue :
    getEmptyValue(props.type),
    mergedProps.withTime
  );

  const [_value, _setValue] = createSignal<any>(initialValue);

  const finalValue = createMemo(() => {
    const currentValue = controlled ? convertDatesValue(props.value, mergedProps.withTime) : _value();

    if (storedType !== props.type) {
      storedType = props.type;

      if (!controlled) {
        const newValue = props.defaultValue !== undefined ? props.defaultValue : getEmptyValue(props.type);
        _setValue(convertDatesValue(newValue, mergedProps.withTime));
        return convertDatesValue(newValue, mergedProps.withTime);
      }
    }

    return currentValue;
  });

  const setValue = (newValue: any) => {
    const convertedValue = convertDatesValue(newValue, mergedProps.withTime);
    _setValue(convertedValue);
    props.onChange?.(convertedValue as DatePickerValue<Type, DateStringValue>);
  };

  return [finalValue, setValue, controlled] as const;
}
