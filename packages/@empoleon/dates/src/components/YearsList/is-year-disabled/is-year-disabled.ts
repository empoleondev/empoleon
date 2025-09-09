import dayjs from 'dayjs';
import { DateStringValue } from '../../../types';

interface IsYearDisabledInput {
  year: DateStringValue;
  minDate: DateStringValue | Date | undefined;
  maxDate: DateStringValue | Date | undefined;
}

export function isYearDisabled(props: IsYearDisabledInput): boolean {
  if (!props.minDate && !props.maxDate) {
    return false;
  }

  if (props.minDate && dayjs(props.year).isBefore(props.minDate, 'year')) {
    return true;
  }

  if (props.maxDate && dayjs(props.year).isAfter(props.maxDate, 'year')) {
    return true;
  }

  return false;
}
