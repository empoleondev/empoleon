import dayjs from 'dayjs';
import { createMemo } from 'solid-js';
import { useDisclosure } from '@empoleon/hooks';
import { useDatesContext } from '../../components/DatesProvider';
import { DatePickerType, DatePickerValue } from '../../types';
import { DateFormatter, getFormattedDate } from '../../utils';
import { useUncontrolledDates } from '../use-uncontrolled-dates/use-uncontrolled-dates';

interface UseDatesInput<Type extends DatePickerType = 'default'> {
  type: Type;
  value: DatePickerValue<Type> | undefined;
  defaultValue: DatePickerValue<Type> | undefined;
  onChange: ((value: DatePickerValue<Type>) => void) | undefined;
  locale: string | undefined;
  format: string | undefined;
  closeOnChange: boolean | undefined;
  sortDates: boolean | undefined;
  labelSeparator: string | undefined;
  valueFormatter: DateFormatter | undefined;
}

export function useDatesInput<Type extends DatePickerType = 'default'>(props: UseDatesInput<Type>) {
  const ctx = useDatesContext();

  const [dropdownOpened, dropdownHandlers] = useDisclosure(false);

  const [_value, _setValue] = useUncontrolledDates({
    type: props.type,
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
  });

  const formattedValue = createMemo(() =>
    getFormattedDate({
      type: props.type,
      date: _value(),
      locale: ctx.getLocale(props.locale),
      format: props.format!,
      labelSeparator: ctx.getLabelSeparator(props.labelSeparator),
      formatter: props.valueFormatter,
    })
  );

  const setValue = (val: any) => {
    if (props.closeOnChange) {
      if (props.type === 'default') {
        dropdownHandlers.close();
      }

      if (props.type === 'range' && val[0] && val[1]) {
        dropdownHandlers.close();
      }
    }

    if (props.sortDates && props.type === 'multiple') {
      _setValue([...val].sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1)));
    } else {
      _setValue(val);
    }
  };

  const onClear = () =>
    setValue(props.type === 'range' ? [null, null] : props.type === 'multiple' ? [] : null);
  const shouldClear =
    props.type === 'range'
      ? !!_value()[0]
      : props.type === 'multiple'
        ? _value().length > 0
        : _value() !== null;

  return {
    _value,
    setValue,
    onClear,
    shouldClear,
    formattedValue,
    dropdownOpened,
    dropdownHandlers,
  };
}
