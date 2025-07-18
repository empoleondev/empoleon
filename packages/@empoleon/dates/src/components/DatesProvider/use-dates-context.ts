import { useContext } from 'solid-js';
import { DayOfWeek } from '../../types';
import { DatesProviderContext } from './DatesProvider';

export function useDatesContext() {
  const ctx = useContext(DatesProviderContext);
  const getLocale = (input?: string) => input || ctx.locale;

  const getFirstDayOfWeek = (input?: DayOfWeek) => (typeof input === 'number' ? input : ctx.firstDayOfWeek);

  const getWeekendDays = (input?: DayOfWeek[]) => (Array.isArray(input) ? input : ctx.weekendDays);

  const getLabelSeparator = (input?: string) => (typeof input === 'string' ? input : ctx.labelSeparator);

  return {
    ...ctx,
    getLocale,
    getFirstDayOfWeek,
    getWeekendDays,
    getLabelSeparator,
  };
}
