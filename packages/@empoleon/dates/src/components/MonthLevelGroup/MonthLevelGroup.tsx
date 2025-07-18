import { JSX, splitProps } from 'solid-js';
import dayjs from 'dayjs';
import { BoxProps, ElementProps, factory, Factory, StylesApiProps, useProps } from '@empoleon/core';
import { DateStringValue } from '../../types';
import { handleControlKeyDown } from '../../utils';
import { LevelsGroup, LevelsGroupStylesNames } from '../LevelsGroup';
import { MonthLevel, MonthLevelSettings, MonthLevelStylesNames } from '../MonthLevel';

export type MonthLevelGroupStylesNames = MonthLevelStylesNames | LevelsGroupStylesNames;

export interface MonthLevelGroupProps
  extends BoxProps,
    Omit<MonthLevelSettings, 'withPrevious' | 'withNext' | '__onDayKeyDown' | '__getDayRef'>,
    Omit<StylesApiProps<MonthLevelGroupFactory>, 'classNames' | 'styles'>,
    ElementProps<'div'> {
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, JSX.CSSProperties>>;
  __staticSelector?: string;

  /** Number of columns to display next to each other */
  numberOfColumns?: number;

  /** Month to display */
  month: DateStringValue;

  /** Function that returns level control `aria-label` based on month date */
  levelControlAriaLabel?: ((month: DateStringValue) => string) | string;

  /** Passed as `isStatic` prop to `Month` component */
  static?: boolean;
}

export type MonthLevelGroupFactory = Factory<{
  props: MonthLevelGroupProps;
  ref: HTMLDivElement;
  stylesNames: MonthLevelGroupStylesNames;
}>;

const defaultProps: Partial<MonthLevelGroupProps> = {
  numberOfColumns: 1,
};

export const MonthLevelGroup = factory<MonthLevelGroupFactory>(_props => {
  const props = useProps('MonthLevelGroup', defaultProps, _props);
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
    '__onDayClick',
    '__onDayMouseEnter',
    'withCellSpacing',
    'highlightToday',
    'withWeekNumbers',

    // CalendarHeader settings
    '__preventFocus',
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

    // Other settings
    'classNames',
    'styles',
    'unstyled',
    'numberOfColumns',
    'levelControlAriaLabel',
    'monthLabelFormat',
    '__staticSelector',
    '__stopPropagation',
    'size',
    'static',
    'vars',
    'ref'
  ]);

  let daysRefs: HTMLButtonElement[][][] = [];

  const months = Array(local.numberOfColumns)
    .fill(0)
    .map((_, monthIndex) => {
      const currentMonth = dayjs(local.month).add(monthIndex, 'months').format('YYYY-MM-DD');

      return (
        <MonthLevel
          month={currentMonth}
          withNext={monthIndex === local.numberOfColumns! - 1}
          withPrevious={monthIndex === 0}
          monthLabelFormat={local.monthLabelFormat}
          __stopPropagation={local.__stopPropagation}
          __onDayClick={local.__onDayClick}
          __onDayMouseEnter={local.__onDayMouseEnter}
          __onDayKeyDown={(event, payload) =>
            handleControlKeyDown({
              levelIndex: monthIndex,
              rowIndex: payload.rowIndex,
              cellIndex: payload.cellIndex,
              event,
              controlsRef: daysRefs,
            })
          }
          __getDayRef={(rowIndex, cellIndex, node) => {
            if (!Array.isArray(daysRefs[monthIndex])) {
              daysRefs[monthIndex] = [];
            }

            if (!Array.isArray(daysRefs[monthIndex][rowIndex])) {
              daysRefs[monthIndex][rowIndex] = [];
            }

            daysRefs[monthIndex][rowIndex][cellIndex] = node;
          }}
          levelControlAriaLabel={
            typeof local.levelControlAriaLabel === 'function'
              ? local.levelControlAriaLabel(currentMonth)
              : local.levelControlAriaLabel
          }
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
          __preventFocus={local.__preventFocus}
          nextIcon={local.nextIcon}
          previousIcon={local.previousIcon}
          nextLabel={local.nextLabel}
          previousLabel={local.previousLabel}
          onNext={local.onNext}
          onPrevious={local.onPrevious}
          onLevelClick={local.onLevelClick}
          nextDisabled={local.nextDisabled}
          previousDisabled={local.previousDisabled}
          hasNextLevel={local.hasNextLevel}
          classNames={local.classNames}
          styles={local.styles}
          unstyled={local.unstyled}
          __staticSelector={local.__staticSelector || 'MonthLevelGroup'}
          size={local.size}
          static={local.static}
          withCellSpacing={local.withCellSpacing}
          highlightToday={local.highlightToday}
          withWeekNumbers={local.withWeekNumbers}
        />
      );
    });

  return (
    <LevelsGroup
      classNames={local.classNames}
      styles={local.styles}
      __staticSelector={local.__staticSelector || 'MonthLevelGroup'}
      ref={local.ref}
      size={local.size}
      {...others}
    >
      {months}
    </LevelsGroup>
  );
});

MonthLevelGroup.classes = { ...LevelsGroup.classes, ...MonthLevel.classes };
MonthLevelGroup.displayName = '@empoleon/dates/MonthLevelGroup';
