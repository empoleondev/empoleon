import { JSX, splitProps } from 'solid-js';
import dayjs from 'dayjs';
import { BoxProps, ElementProps, factory, Factory, StylesApiProps, useProps } from '@empoleon/core';
import { DateStringValue } from '../../types';
import { handleControlKeyDown } from '../../utils';
import { LevelsGroup, LevelsGroupStylesNames } from '../LevelsGroup';
import { YearLevel, YearLevelSettings, YearLevelStylesNames } from '../YearLevel';

export type YearLevelGroupStylesNames = YearLevelStylesNames | LevelsGroupStylesNames;

export interface YearLevelGroupProps
  extends BoxProps,
    Omit<YearLevelSettings, 'withPrevious' | 'withNext' | '__onControlKeyDown' | '__getControlRef'>,
    Omit<StylesApiProps<YearLevelGroupFactory>, 'classNames' | 'styles'>,
    ElementProps<'div'> {
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, JSX.CSSProperties>>;
  __staticSelector?: string;

  /** Number of columns displayed next to each other */
  numberOfColumns?: number;

  /** Displayed year */
  year: DateStringValue;

  /** Function that returns level control `aria-label` */
  levelControlAriaLabel?: ((year: DateStringValue) => string) | string;
}

export type YearLevelGroupFactory = Factory<{
  props: YearLevelGroupProps;
  ref: HTMLDivElement;
  stylesNames: YearLevelGroupStylesNames;
}>;

const defaultProps: Partial<YearLevelGroupProps> = {
  numberOfColumns: 1,
};

export const YearLevelGroup = factory<YearLevelGroupFactory>(_props => {
  const props = useProps('YearLevelGroup', defaultProps, _props);
  const [local, others] = splitProps(props, [
    // YearLevel settings
    'year',
    'locale',
    'minDate',
    'maxDate',
    'monthsListFormat',
    'getMonthControlProps',
    '__onControlClick',
    '__onControlMouseEnter',
    'withCellSpacing',

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
    '__staticSelector',
    '__stopPropagation',
    'numberOfColumns',
    'levelControlAriaLabel',
    'yearLabelFormat',
    'size',
    'vars',
    'ref'
  ]);

  let controlsRef: HTMLButtonElement[][][] = [];

  const years = Array(local.numberOfColumns)
    .fill(0)
    .map((_, yearIndex) => {
      const currentYear = dayjs(local.year).add(yearIndex, 'years').format('YYYY-MM-DD');

      return (
        <YearLevel
          size={local.size}
          monthsListFormat={local.monthsListFormat}
          year={currentYear}
          withNext={yearIndex === local.numberOfColumns! - 1}
          withPrevious={yearIndex === 0}
          yearLabelFormat={local.yearLabelFormat}
          __stopPropagation={local.__stopPropagation}
          __onControlClick={local.__onControlClick}
          __onControlMouseEnter={local.__onControlMouseEnter}
          __onControlKeyDown={(event, payload) =>
            handleControlKeyDown({
              levelIndex: yearIndex,
              rowIndex: payload.rowIndex,
              cellIndex: payload.cellIndex,
              event: event as unknown as KeyboardEvent,
              controlsRef,
            })
          }
          __getControlRef={(rowIndex, cellIndex, node) => {
            if (!Array.isArray(controlsRef[yearIndex])) {
              controlsRef[yearIndex] = [];
            }

            if (!Array.isArray(controlsRef[yearIndex][rowIndex])) {
              controlsRef[yearIndex][rowIndex] = [];
            }

            controlsRef[yearIndex][rowIndex][cellIndex] = node;
          }}
          levelControlAriaLabel={
            typeof local.levelControlAriaLabel === 'function'
              ? local.levelControlAriaLabel(currentYear)
              : local.levelControlAriaLabel
          }
          locale={local.locale}
          minDate={local.minDate}
          maxDate={local.maxDate}
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
          getMonthControlProps={local.getMonthControlProps}
          classNames={local.classNames}
          styles={local.styles}
          unstyled={local.unstyled}
          __staticSelector={local.__staticSelector || 'YearLevelGroup'}
          withCellSpacing={local.withCellSpacing}
        />
      );
    });

  return (
    <LevelsGroup
      classNames={local.classNames}
      styles={local.styles}
      __staticSelector={local.__staticSelector || 'YearLevelGroup'}
      ref={local.ref}
      size={local.size}
      unstyled={local.unstyled}
      {...others}
    >
      {years}
    </LevelsGroup>
  );
});

YearLevelGroup.classes = { ...YearLevel.classes, ...LevelsGroup.classes };
YearLevelGroup.displayName = '@empoleon/dates/YearLevelGroup';
