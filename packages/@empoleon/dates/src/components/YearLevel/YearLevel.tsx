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
import { MonthsList, MonthsListSettings, MonthsListStylesNames } from '../MonthsList';

export type YearLevelStylesNames = MonthsListStylesNames | CalendarHeaderStylesNames;

export interface YearLevelBaseSettings extends MonthsListSettings {
  /** dayjs label format to display year label or a function that returns year label based on year value, `"YYYY"` by default */
  yearLabelFormat?: DateLabelFormat;
}

export interface YearLevelSettings extends YearLevelBaseSettings, CalendarHeaderSettings {}

export interface YearLevelProps
  extends BoxProps,
    YearLevelSettings,
    Omit<StylesApiProps<YearLevelFactory>, 'classNames' | 'styles'>,
    ElementProps<'div'> {
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, JSX.CSSProperties>>;
  __staticSelector?: string;

  /** Displayed year value in `YYYY-MM-DD` format */
  year: DateStringValue;

  /** `aria-label` for change level control */
  levelControlAriaLabel?: string;
}

export type YearLevelFactory = Factory<{
  props: YearLevelProps;
  ref: HTMLDivElement;
  stylesNames: YearLevelStylesNames;
}>;

const defaultProps: Partial<YearLevelProps> = {
  yearLabelFormat: 'YYYY',
};

export const YearLevel = factory<YearLevelFactory>(_props => {
  const props = useProps('YearLevel', defaultProps, _props);
  const [local, others] = splitProps(props, [
    // MonthsList settings
    'year',
    'locale',
    'minDate',
    'maxDate',
    'monthsListFormat',
    'getMonthControlProps',
    '__getControlRef',
    '__onControlKeyDown',
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
    'levelControlAriaLabel',
    'withNext',
    'withPrevious',

    // Other props
    'yearLabelFormat',
    '__staticSelector',
    '__stopPropagation',
    'size',
    'classNames',
    'styles',
    'unstyled',
    'ref'
  ]);

  const ctx = useDatesContext();

  const stylesApiProps = {
    __staticSelector: local.__staticSelector || 'YearLevel',
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    size: local.size,
  };

  const _nextDisabled =
    typeof local.nextDisabled === 'boolean'
      ? local.nextDisabled
      : local.maxDate
        ? !dayjs(local.year).endOf('year').isBefore(local.maxDate)
        : false;

  const _previousDisabled =
    typeof local.previousDisabled === 'boolean'
      ? local.previousDisabled
      : local.minDate
        ? !dayjs(local.year).startOf('year').isAfter(local.minDate)
        : false;

  return (
    <Box data-year-level size={local.size} ref={local.ref} {...others}>
      <CalendarHeader
        label={
          typeof local.yearLabelFormat === 'function'
            ? local.yearLabelFormat(local.year)
            : dayjs(local.year)
                .locale(local.locale || ctx.locale)
                .format(local.yearLabelFormat)
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

      <MonthsList
        year={local.year}
        locale={local.locale}
        minDate={local.minDate}
        maxDate={local.maxDate}
        monthsListFormat={local.monthsListFormat}
        getMonthControlProps={local.getMonthControlProps}
        __getControlRef={local.__getControlRef}
        __onControlKeyDown={local.__onControlKeyDown}
        __onControlClick={local.__onControlClick}
        __onControlMouseEnter={local.__onControlMouseEnter}
        __preventFocus={local.__preventFocus}
        __stopPropagation={local.__stopPropagation}
        withCellSpacing={local.withCellSpacing}
        {...stylesApiProps}
      />
    </Box>
  );
});

YearLevel.classes = { ...CalendarHeader.classes, ...MonthsList.classes };
YearLevel.displayName = '@empoleon/dates/YearLevel';
