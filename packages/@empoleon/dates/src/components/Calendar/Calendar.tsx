import dayjs from 'dayjs';
import {
  Box,
  BoxProps,
  ElementProps,
  Factory,
  factory,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
} from '@empoleon/core';
import { useUncontrolled } from '@empoleon/hooks';
import { useUncontrolledDates } from '../../hooks';
import { CalendarLevel, DateStringValue } from '../../types';
import { toDateString } from '../../utils';
import { DecadeLevelSettings } from '../DecadeLevel';
import { DecadeLevelGroup, DecadeLevelGroupStylesNames } from '../DecadeLevelGroup';
import { MonthLevelSettings } from '../MonthLevel';
import { MonthLevelGroup, MonthLevelGroupStylesNames } from '../MonthLevelGroup';
import { YearLevelSettings } from '../YearLevel';
import { YearLevelGroup, YearLevelGroupStylesNames } from '../YearLevelGroup';
import { clampLevel } from './clamp-level/clamp-level';
import { Ref, Show, splitProps } from 'solid-js';

export type CalendarStylesNames =
  | MonthLevelGroupStylesNames
  | YearLevelGroupStylesNames
  | DecadeLevelGroupStylesNames;

export interface CalendarAriaLabels {
  monthLevelControl?: string;
  yearLevelControl?: string;

  nextMonth?: string;
  previousMonth?: string;

  nextYear?: string;
  previousYear?: string;

  nextDecade?: string;
  previousDecade?: string;
}

type OmittedSettings =
  | 'onNext'
  | 'onPrevious'
  | 'onLevelClick'
  | 'withNext'
  | 'withPrevious'
  | 'nextDisabled'
  | 'previousDisabled';

export interface CalendarSettings
  extends Omit<DecadeLevelSettings, OmittedSettings>,
    Omit<YearLevelSettings, OmittedSettings>,
    Omit<MonthLevelSettings, OmittedSettings> {
  /** Initial displayed level in uncontrolled mode */
  defaultLevel?: CalendarLevel;

  /** Current displayed level displayed in controlled mode */
  level?: CalendarLevel;

  /** Called when level changes */
  onLevelChange?: (level: CalendarLevel) => void;

  /** Called when user selects year */
  onYearSelect?: (date: DateStringValue) => void;

  /** Called when user selects month */
  onMonthSelect?: (date: DateStringValue) => void;

  /** Called when mouse enters year control */
  onYearMouseEnter?: (event: MouseEvent, date: DateStringValue) => void;

  /** Called when mouse enters month control */
  onMonthMouseEnter?: (event: MouseEvent, date: DateStringValue) => void;
}

export interface CalendarBaseProps {
  __staticSelector?: string;

  /** Prevents focus shift when buttons are clicked */
  __preventFocus?: boolean;

  /** Determines whether date should be updated when year control is clicked */
  __updateDateOnYearSelect?: boolean;

  /** Determines whether date should be updated when month control is clicked */
  __updateDateOnMonthSelect?: boolean;

  /** Assigns function to set date to the given ref */
  __setDateRef?: Ref<((date: DateStringValue) => void) | null>;

  /** Assigns function to set level to the given ref */
  __setLevelRef?: Ref<((level: CalendarLevel) => void) | null>;

  /** Initial displayed date in uncontrolled mode */
  defaultDate?: DateStringValue | Date;

  /** Displayed date in controlled mode */
  date?: DateStringValue | Date;

  /** Called when date changes */
  onDateChange?: (date: DateStringValue) => void;

  /** Number of columns displayed next to each other, `1` by default */
  numberOfColumns?: number;

  /** Number of columns to scroll with next/prev buttons, same as `numberOfColumns` if not set explicitly */
  columnsToScroll?: number;

  /** `aria-label` attributes for controls on different levels */
  ariaLabels?: CalendarAriaLabels;

  /** Next button `aria-label` */
  nextLabel?: string;

  /** Previous button `aria-label` */
  previousLabel?: string;

  /** Called when the next decade button is clicked */
  onNextDecade?: (date: DateStringValue) => void;

  /** Called when the previous decade button is clicked */
  onPreviousDecade?: (date: DateStringValue) => void;

  /** Called when the next year button is clicked */
  onNextYear?: (date: DateStringValue) => void;

  /** Called when the previous year button is clicked */
  onPreviousYear?: (date: DateStringValue) => void;

  /** Called when the next month button is clicked */
  onNextMonth?: (date: DateStringValue) => void;

  /** Called when the previous month button is clicked */
  onPreviousMonth?: (date: DateStringValue) => void;
}

export interface CalendarProps
  extends BoxProps,
    CalendarSettings,
    CalendarBaseProps,
    StylesApiProps<CalendarFactory>,
    ElementProps<'div'> {
  /** Max level that user can go up to (decade, year, month), defaults to decade */
  maxLevel?: CalendarLevel;

  /** Min level that user can go down to (decade, year, month), defaults to month */
  minLevel?: CalendarLevel;

  /** Determines whether days should be static, static days can be used to display month if it is not expected that user will interact with the component in any way  */
  static?: boolean;
}

export type CalendarFactory = Factory<{
  props: CalendarProps;
  ref: HTMLDivElement;
  stylesNames: CalendarStylesNames;
}>;

const defaultProps = {
  maxLevel: 'decade',
  minLevel: 'month',
  __updateDateOnYearSelect: true,
  __updateDateOnMonthSelect: true,
} satisfies Partial<CalendarProps>;;

export const Calendar = factory<CalendarFactory>(_props  => {
  const props = useProps('Calendar', defaultProps, _props);
  const [local, others] = splitProps(props, [
    // CalendarLevel props
    'vars',
    'maxLevel',
    'minLevel',
    'defaultLevel',
    'level',
    'onLevelChange',
    'date',
    'defaultDate',
    'onDateChange',
    'numberOfColumns',
    'columnsToScroll',
    'ariaLabels',
    'nextLabel',
    'previousLabel',
    'onYearSelect',
    'onMonthSelect',
    'onYearMouseEnter',
    'onMonthMouseEnter',
    'headerControlsOrder',
    '__updateDateOnYearSelect',
    '__updateDateOnMonthSelect',
    '__setDateRef',
    '__setLevelRef',

    // MonthLevelGroup props
    'firstDayOfWeek',
    'weekdayFormat',
    'weekendDays',
    'getDayProps',
    'excludeDate',
    'renderDay',
    'hideOutsideDates',
    'hideWeekdays',
    'getDayAriaLabel',
    'monthLabelFormat',
    'nextIcon',
    'previousIcon',
    '__onDayClick',
    '__onDayMouseEnter',
    'withCellSpacing',
    'highlightToday',
    'withWeekNumbers',

    // YearLevelGroup props
    'monthsListFormat',
    'getMonthControlProps',
    'yearLabelFormat',

    // DecadeLevelGroup props
    'yearsListFormat',
    'getYearControlProps',
    'decadeLabelFormat',

    // Other props
    'classNames',
    'styles',
    'unstyled',
    'minDate',
    'maxDate',
    'locale',
    '__staticSelector',
    'size',
    '__preventFocus',
    '__stopPropagation',
    'onNextDecade',
    'onPreviousDecade',
    'onNextYear',
    'onPreviousYear',
    'onNextMonth',
    'onPreviousMonth',
    'static',
    'attributes',
    'ref'
  ]);

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<CalendarFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  const [_level, setLevel] = useUncontrolled({
    value: () => local.level ? clampLevel(local.level, local.minLevel,local. maxLevel) : undefined,
    defaultValue: clampLevel(local.defaultLevel, local.minLevel, local.maxLevel),
    finalValue: clampLevel(undefined, local.minLevel, local.maxLevel),
    onChange: local.onLevelChange,
  });

  const [_date, setDate] = useUncontrolledDates({
    type: 'default',
    value: toDateString(local.date),
    defaultValue: toDateString(local.defaultDate),
    onChange: local.onDateChange as any,
  });

  const stylesApiProps = {
    __staticSelector: local.__staticSelector || 'Calendar',
    styles: resolvedStyles,
    classNames: resolvedClassNames,
    unstyled: local.unstyled,
    size: local.size,
    attributes: local.attributes
  };

  const _columnsToScroll = local.columnsToScroll || local.numberOfColumns || 1;

  const now = new Date();
  const fallbackDate =
    local.minDate && dayjs(now).isAfter(local.minDate) ? local.minDate : dayjs(now).format('YYYY-MM-DD');
  const currentDate = () => _date() || fallbackDate;

  const handleNextMonth = () => {
    const nextDate = dayjs(currentDate()).add(_columnsToScroll, 'month').format('YYYY-MM-DD');
    local.onNextMonth?.(nextDate);
    setDate(nextDate);
  };

  const handlePreviousMonth = () => {
    const nextDate = dayjs(currentDate()).subtract(_columnsToScroll, 'month').format('YYYY-MM-DD');
    local.onPreviousMonth?.(nextDate);
    setDate(nextDate);
  };

  const handleNextYear = () => {
    const nextDate = dayjs(currentDate()).add(_columnsToScroll, 'year').format('YYYY-MM-DD');
    local.onNextYear?.(nextDate);
    setDate(nextDate);
  };

  const handlePreviousYear = () => {
    const nextDate = dayjs(currentDate()).subtract(_columnsToScroll, 'year').format('YYYY-MM-DD');
    local.onPreviousYear?.(nextDate);
    setDate(nextDate);
  };

  const handleNextDecade = () => {
    const nextDate = dayjs(currentDate())
      .add(10 * _columnsToScroll, 'year')
      .format('YYYY-MM-DD');
    local.onNextDecade?.(nextDate);
    setDate(nextDate);
  };

  const handlePreviousDecade = () => {
    const nextDate = dayjs(currentDate())
      .subtract(10 * _columnsToScroll, 'year')
      .format('YYYY-MM-DD');
    local.onPreviousDecade?.(nextDate);
    setDate(nextDate);
  };

  return (
    <Box ref={local.ref} size={local.size} data-calendar {...others}>
      <Show when={_level() === 'month'}>
        <MonthLevelGroup
          month={currentDate()}
          minDate={local.minDate}
          maxDate={local.maxDate}
          firstDayOfWeek={local.firstDayOfWeek}
          weekdayFormat={local.weekdayFormat}
          weekendDays={local.weekendDays}
          getDayProps={local.getDayProps}
          excludeDate={local.excludeDate}
          renderDay={local.renderDay}
          hideOutsideDates={local.hideOutsideDates}
          hideWeekdays={local.hideWeekdays}
          getDayAriaLabel={local.getDayAriaLabel}
          onNext={handleNextMonth}
          onPrevious={handlePreviousMonth}
          hasNextLevel={local.maxLevel !== 'month'}
          onLevelClick={() => setLevel('year')}
          numberOfColumns={local.numberOfColumns}
          locale={local.locale}
          levelControlAriaLabel={local.ariaLabels?.monthLevelControl}
          nextLabel={local.ariaLabels?.nextMonth ?? local.nextLabel}
          nextIcon={local.nextIcon}
          previousLabel={local.ariaLabels?.previousMonth ?? local.previousLabel}
          previousIcon={local.previousIcon}
          monthLabelFormat={local.monthLabelFormat}
          __onDayClick={local.__onDayClick}
          __onDayMouseEnter={local.__onDayMouseEnter}
          __preventFocus={local.__preventFocus}
          __stopPropagation={local.__stopPropagation}
          static={local.static}
          withCellSpacing={local.withCellSpacing}
          highlightToday={local.highlightToday}
          withWeekNumbers={local.withWeekNumbers}
          headerControlsOrder={local.headerControlsOrder}
          {...stylesApiProps}
        />
      </Show>
      <Show when={_level() === 'year'}>
        <YearLevelGroup
          year={currentDate()}
          numberOfColumns={local.numberOfColumns}
          minDate={local.minDate}
          maxDate={local.maxDate}
          monthsListFormat={local.monthsListFormat}
          getMonthControlProps={local.getMonthControlProps}
          locale={local.locale}
          onNext={handleNextYear}
          onPrevious={handlePreviousYear}
          hasNextLevel={local.maxLevel !== 'month' && local.maxLevel !== 'year'}
          onLevelClick={() => setLevel('decade')}
          levelControlAriaLabel={local.ariaLabels?.yearLevelControl}
          nextLabel={local.ariaLabels?.nextYear ?? local.nextLabel}
          nextIcon={local.nextIcon}
          previousLabel={local.ariaLabels?.previousYear ?? local.previousLabel}
          previousIcon={local.previousIcon}
          yearLabelFormat={local.yearLabelFormat}
          __onControlMouseEnter={local.onMonthMouseEnter}
          __onControlClick={(_event, payload) => {
            local.__updateDateOnMonthSelect && setDate(payload);
            setLevel(clampLevel('month', local.minLevel, local.maxLevel));
            local.onMonthSelect?.(payload);
          }}
          __preventFocus={local.__preventFocus}
          __stopPropagation={local.__stopPropagation}
          withCellSpacing={local.withCellSpacing}
          headerControlsOrder={local.headerControlsOrder}

          {...stylesApiProps}
        />
      </Show>
      <Show when={_level() === 'decade'}>
        <DecadeLevelGroup
          decade={currentDate()}
          minDate={local.minDate}
          maxDate={local.maxDate}
          yearsListFormat={local.yearsListFormat}
          getYearControlProps={local.getYearControlProps}
          locale={local.locale}
          onNext={handleNextDecade}
          onPrevious={handlePreviousDecade}
          numberOfColumns={local.numberOfColumns}
          nextLabel={local.ariaLabels?.nextDecade ?? local.nextLabel}
          nextIcon={local.nextIcon}
          previousLabel={local.ariaLabels?.previousDecade ?? local.previousLabel}
          previousIcon={local.previousIcon}
          decadeLabelFormat={local.decadeLabelFormat}
          __onControlMouseEnter={local.onYearMouseEnter}
          __onControlClick={(_event, payload) => {
            local.__updateDateOnYearSelect && setDate(payload);
            setLevel(clampLevel('year', local.minLevel, local.maxLevel));
            local.onYearSelect?.(payload);
          }}
          __preventFocus={local.__preventFocus}
          __stopPropagation={local.__stopPropagation}
          withCellSpacing={local.withCellSpacing}
          headerControlsOrder={local.headerControlsOrder}

          {...stylesApiProps}
        />
      </Show>
    </Box>
  );
});

Calendar.classes = {
  ...DecadeLevelGroup.classes,
  ...YearLevelGroup.classes,
  ...MonthLevelGroup.classes,
};
Calendar.displayName = '@empoleon/dates/Calendar';
