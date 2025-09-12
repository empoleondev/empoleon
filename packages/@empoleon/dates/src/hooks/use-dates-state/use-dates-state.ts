import { createEffect, createMemo, createSignal, JSX } from 'solid-js';
import dayjs from 'dayjs';
import { DatePickerType, DateStringValue, PickerBaseProps } from '../../types';
import { useUncontrolledDates } from '../use-uncontrolled-dates/use-uncontrolled-dates';
import { isInRange } from './is-in-range/is-in-range';

interface UseDatesRangeInput<Type extends DatePickerType = 'default'>
  extends PickerBaseProps<Type> {
  level: 'year' | 'month' | 'day';
  type: Type;
  onMouseLeave?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>;
}

export function useDatesState<Type extends DatePickerType = 'default'>(props: UseDatesRangeInput<Type>) {
  const [_value, setValue] = useUncontrolledDates({
    type: props.type,
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
  });

  const [pickedDate, setPickedDate] = createSignal<DateStringValue | null>(
    props.type === 'range' ? (_value()[0] && !_value()[1] ? _value()[0] : null) : null
  );
  const [hoveredDate, setHoveredDate] = createSignal<DateStringValue | null>(null);

  const onDateChange = (date: DateStringValue) => {
    if (props.type === 'range') {
      if (pickedDate() && !_value()[1]) {
        if (dayjs(date).isSame(pickedDate(), props.level) && !props.allowSingleDateInRange) {
          setPickedDate(null);
          setHoveredDate(null);
          setValue([null, null]);
          return;
        }

        const result: [DateStringValue, DateStringValue] = [date, pickedDate()!];
        result.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));
        setValue(result);
        setHoveredDate(null);
        setPickedDate(null);
        return;
      }

      if (
        _value()[0] &&
        !_value()[1] &&
        dayjs(date).isSame(_value()[0], props.level) &&
        !props.allowSingleDateInRange
      ) {
        setPickedDate(null);
        setHoveredDate(null);
        setValue([null, null]);
        return;
      }

      setValue([date, null]);
      setHoveredDate(null);
      setPickedDate(date);
      return;
    }

    if (props.type === 'multiple') {
      if (_value().some((selected: Date) => dayjs(selected).isSame(date, props.level))) {
        setValue(_value().filter((selected: Date) => !dayjs(selected).isSame(date, props.level)));
      } else {
        setValue([..._value(), date]);
      }

      return;
    }

    if (_value() && props.allowDeselect && dayjs(date).isSame(_value(), props.level)) {
      setValue(null);
    } else {
      setValue(date);
    }
  };

  const isDateInRange = (date: DateStringValue) => {
    if (pickedDate() && hoveredDate()) {
      return isInRange(date, [hoveredDate()!, pickedDate()!]);
    }

    if (_value()[0] && _value()[1]) {
      return isInRange(date, _value());
    }

    return false;
  };

  const onRootMouseLeave =
    props.type === 'range'
      ? (event: MouseEvent & { currentTarget: HTMLDivElement; target: Element }) => {
          typeof props.onMouseLeave === 'function' && props.onMouseLeave(event);
          setHoveredDate(null);
        }
      : props.onMouseLeave;

  const isFirstInRange = (date: DateStringValue) => {
    if (!_value()[0]) {
      return false;
    }

    if (dayjs(date).isSame(_value()[0], props.level)) {
      return !(hoveredDate && dayjs(hoveredDate()).isBefore(_value()[0]));
    }

    return false;
  };

  const isLastInRange = (date: DateStringValue) => {
    if (_value()[1]) {
      return dayjs(date).isSame(_value()[1], props.level);
    }

    if (!_value()[0] || !hoveredDate) {
      return false;
    }

    return dayjs(hoveredDate()).isBefore(_value()[0]) && dayjs(date).isSame(_value()[0], props.level);
  };

  const getControlProps = (date: DateStringValue) => {
    if (props.type === 'range') {
      return {
        selected: _value().some(
          (selection: DateStringValue) => selection && dayjs(selection).isSame(date, props.level)
        ),
        inRange: isDateInRange(date),
        firstInRange: isFirstInRange(date),
        lastInRange: isLastInRange(date),
        'data-autofocus': (!!_value()[0] && dayjs(_value()[0]).isSame(date, props.level)) || undefined,
      };
    }

    if (props.type === 'multiple') {
      return {
        selected: _value().some(
          (selection: DateStringValue) => selection && dayjs(selection).isSame(date, props.level)
        ),
        'data-autofocus': (!!_value()[0] && dayjs(_value()[0]).isSame(date, props.level)) || undefined,
      };
    }

    const selected = dayjs(_value()).isSame(date, props.level);
    return { selected, 'data-autofocus': selected || undefined };
  };

  const onHoveredDateChange = props.type === 'range' && pickedDate() ? setHoveredDate : () => {};

  createEffect(() => {
    if (props.type !== 'range') {
      return;
    }

    if (_value()[0] && !_value()[1]) {
      setPickedDate(_value()[0]);
    } else {
      const isNeitherSelected = _value()[0] == null && _value()[1] == null;
      const isBothSelected = _value()[0] != null && _value()[1] != null;
      if (isNeitherSelected || isBothSelected) {
        setPickedDate(null);
        setHoveredDate(null);
      }
    }
  }, [_value()]);

  return {
    onDateChange,
    onRootMouseLeave,
    onHoveredDateChange,
    getControlProps,
    _value,
    setValue,
  };
}
