import dayjs from 'dayjs';
import { JSX, mergeProps } from 'solid-js';
import type { DateLabelFormat, DayOfWeek } from '../../../types';

interface GetWeekdaysNamesInput {
  locale: string;
  format?: DateLabelFormat;
  firstDayOfWeek?: DayOfWeek;
}

export function getWeekdayNames(props: GetWeekdaysNamesInput) {
  const merged = mergeProps(
    {
      format: 'dd',
      firstDayOfWeek: 1,
    },
    props
  );

  const baseDate = dayjs().day(merged.firstDayOfWeek);
  const labels: Array<string | JSX.Element> = [];

  for (let i = 0; i < 7; i += 1) {
    if (typeof merged.format === 'string') {
      labels.push(dayjs(baseDate).add(i, 'days').locale(props.locale).format(merged.format));
    } else {
      labels.push(merged.format(dayjs(baseDate).add(i, 'days').format('YYYY-MM-DD')));
    }
  }

  return labels;
}
