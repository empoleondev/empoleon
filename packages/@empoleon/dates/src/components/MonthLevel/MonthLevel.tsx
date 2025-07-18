import { JSX, splitProps } from 'solid-js';
import dayjs from 'dayjs';
import {
  Box,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  StylesApiProps,
  useProps,
} from '@empoleon/core';
import { DateLabelFormat, DateStringValue } from '../../types';
import {
  CalendarHeader,
  CalendarHeaderSettings,
  CalendarHeaderStylesNames,
} from '../CalendarHeader';
import { useDatesContext } from '../DatesProvider';
import { Month, MonthSettings, MonthStylesNames } from '../Month';

export type MonthLevelStylesNames = MonthStylesNames | CalendarHeaderStylesNames;

export interface MonthLevelBaseSettings extends MonthSettings {
  /** dayjs label format to display month label or a function that returns month label based on month value, `"MMMM YYYY"` */
  monthLabelFormat?: DateLabelFormat;
}

export interface MonthLevelSettings extends MonthLevelBaseSettings, CalendarHeaderSettings {}

export interface MonthLevelProps
  extends BoxProps,
    MonthLevelSettings,
    Omit<StylesApiProps<MonthLevelFactory>, 'classNames' | 'styles'>,
    ElementProps<'div'> {
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, JSX.CSSProperties>>;
  __staticSelector?: string;

  /** Month that is currently displayed */
  month: DateStringValue;

  /** Aria-label for change level control */
  levelControlAriaLabel?: string;

  /** Determines whether days should be static, static days can be used to display month if it is not expected that user will interact with the component in any way  */
  static?: boolean;
}

export type MonthLevelFactory = Factory<{
  props: MonthLevelProps;
  ref: HTMLDivElement;
  stylesNames: MonthLevelStylesNames;
}>;

const defaultProps: Partial<MonthLevelProps> = {
  monthLabelFormat: 'MMMM YYYY',
};

export const MonthLevel = factory<MonthLevelFactory>(_props => {
  const props = useProps('MonthLevel', defaultProps, _props);
  const [local, others] = splitProps(props, [
    // Month settings
    'month',
    'locale',
    'firstDayOfWeek',
    'weekdayFormat',
    'weekendDays',
    'getDayProps',
    'excludeDate',
    'minDate',
    'maxDate',
    'renderDay',
    'hideOutsideDates',
    'hideWeekdays',
    'getDayAriaLabel',
    '__getDayRef',
    '__onDayKeyDown',
    '__onDayClick',
    '__onDayMouseEnter',
    'withCellSpacing',
    'highlightToday',
    'withWeekNumbers',

    // CalendarHeader settings
    '__preventFocus',
    '__stopPropagation',
    'nextIcon',
    'previousIcon',
    'nextLabel',
    'previousLabel',
    'onNext',
    'onPrevious',
    'onLevelClick',
    'nextDisabled',
    'previousDisabled',
    'hasNextLevel',
    'levelControlAriaLabel',
    'withNext',
    'withPrevious',

    // Other props
    'monthLabelFormat',
    'classNames',
    'styles',
    'unstyled',
    '__staticSelector',
    'size',
    'static',
    'ref'
  ]);

  const ctx = useDatesContext();

  const stylesApiProps = {
    __staticSelector: local.__staticSelector || 'MonthLevel',
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    size: local.size,
  };

  const _nextDisabled =
    typeof local.nextDisabled === 'boolean'
      ? local.nextDisabled
      : local.maxDate
        ? !dayjs(local.month).endOf('month').isBefore(local.maxDate)
        : false;

  const _previousDisabled =
    typeof local.previousDisabled === 'boolean'
      ? local.previousDisabled
      : local.minDate
        ? !dayjs(local.month).startOf('month').isAfter(local.minDate)
        : false;

  return (
    <Box data-month-level size={local.size} ref={local.ref} {...others}>
      <CalendarHeader
        label={
          typeof local.monthLabelFormat === 'function'
            ? local.monthLabelFormat(local.month)
            : dayjs(local.month)
                .locale(local.locale || ctx.locale)
                .format(local.monthLabelFormat)
        }
        __preventFocus={local.__preventFocus}
        __stopPropagation={local.__stopPropagation}
        nextIcon={local.nextIcon}
        previousIcon={local.previousIcon}
        nextLabel={local.nextLabel}
        previousLabel={local.previousLabel}
        onNext={local.onNext}
        onPrevious={local.onPrevious}
        onLevelClick={local.onLevelClick}
        nextDisabled={_nextDisabled}
        previousDisabled={_previousDisabled}
        hasNextLevel={local.hasNextLevel}
        levelControlAriaLabel={local.levelControlAriaLabel}
        withNext={local.withNext}
        withPrevious={local.withPrevious}
        {...stylesApiProps}
      />

      <Month
        month={local.month}
        locale={local.locale}
        firstDayOfWeek={local.firstDayOfWeek}
        weekdayFormat={local.weekdayFormat}
        weekendDays={local.weekendDays}
        getDayProps={local.getDayProps}
        excludeDate={local.excludeDate}
        minDate={local.minDate}
        maxDate={local.maxDate}
        renderDay={local.renderDay}
        hideOutsideDates={local.hideOutsideDates}
        hideWeekdays={local.hideWeekdays}
        getDayAriaLabel={local.getDayAriaLabel}
        __getDayRef={local.__getDayRef}
        __onDayKeyDown={local.__onDayKeyDown}
        __onDayClick={local.__onDayClick}
        __onDayMouseEnter={local.__onDayMouseEnter}
        __preventFocus={local.__preventFocus}
        __stopPropagation={local.__stopPropagation}
        static={local.static}
        withCellSpacing={local.withCellSpacing}
        highlightToday={local.highlightToday}
        withWeekNumbers={local.withWeekNumbers}
        {...stylesApiProps}
      />
    </Box>
  );
});

MonthLevel.classes = { ...Month.classes, ...CalendarHeader.classes };
MonthLevel.displayName = '@empoleon/dates/MonthLevel';
