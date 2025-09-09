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
import { DateStringValue } from '../../types';
import {
  CalendarHeader,
  CalendarHeaderSettings,
  CalendarHeaderStylesNames,
} from '../CalendarHeader';
import { useDatesContext } from '../DatesProvider';
import { YearsList, YearsListSettings, YearsListStylesNames } from '../YearsList';
import { getDecadeRange } from './get-decade-range/get-decade-range';
import { JSX, splitProps } from 'solid-js';

export type DecadeLevelStylesNames = YearsListStylesNames | CalendarHeaderStylesNames;

export interface DecadeLevelBaseSettings extends YearsListSettings {
  /** dayjs format for decade label or a function that returns decade label based on the date value, `"YYYY"` by default */
  decadeLabelFormat?:
    | string
    | ((startOfDecade: DateStringValue, endOfDecade: DateStringValue) => JSX.Element);
}

export interface DecadeLevelSettings
  extends DecadeLevelBaseSettings,
    Omit<CalendarHeaderSettings, 'onLevelClick' | 'hasNextLevel'> {}

export interface DecadeLevelProps
  extends BoxProps,
    DecadeLevelSettings,
    Omit<StylesApiProps<DecadeLevelFactory>, 'classNames' | 'styles'>,
    ElementProps<'div'> {
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, JSX.CSSProperties>>;
  __staticSelector?: string;

  /** Displayed decade */
  decade: DateStringValue;

  /** Level control `aria-label` */
  levelControlAriaLabel?: string;
}

export type DecadeLevelFactory = Factory<{
  props: DecadeLevelProps;
  ref: HTMLDivElement;
  stylesNames: DecadeLevelStylesNames;
}>;

const defaultProps = {
  decadeLabelFormat: 'YYYY',
} satisfies Partial<DecadeLevelProps>;

export const DecadeLevel = factory<DecadeLevelFactory>(_props => {
  const props = useProps('DecadeLevel', defaultProps, _props);
  const [local, others] = splitProps(props, [
    // YearsList settings
    'decade',
    'locale',
    'minDate',
    'maxDate',
    'yearsListFormat',
    'getYearControlProps',
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
    'nextDisabled',
    'previousDisabled',
    'levelControlAriaLabel',
    'withNext',
    'withPrevious',

    // Other props
    'decadeLabelFormat',
    'classNames',
    'styles',
    'unstyled',
    '__staticSelector',
    '__stopPropagation',
    'size',
    'attributes',
    'ref'
  ]);

  const ctx = useDatesContext();
  const [startOfDecade, endOfDecade] = getDecadeRange(local.decade);

  const stylesApiProps = {
    __staticSelector: local.__staticSelector || 'DecadeLevel',
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    size: local.size,
    attributes: local.attributes,
  };

  const _nextDisabled =
    typeof local.nextDisabled === 'boolean'
      ? local.nextDisabled
      : local.maxDate
        ? !dayjs(endOfDecade).endOf('year').isBefore(local.maxDate)
        : false;

  const _previousDisabled =
    typeof local.previousDisabled === 'boolean'
      ? local.previousDisabled
      : local.minDate
        ? !dayjs(startOfDecade).startOf('year').isAfter(local.minDate)
        : false;

  const formatDecade = (date: DateStringValue, format: string) =>
    dayjs(date)
      .locale(local.locale || ctx.locale)
      .format(format);

  return (
    <Box data-decade-level size={local.size} ref={local.ref} {...others}>
      <CalendarHeader
        label={
          typeof local.decadeLabelFormat === 'function'
            ? local.decadeLabelFormat(startOfDecade, endOfDecade)
            : `${formatDecade(startOfDecade, local.decadeLabelFormat!)} – ${formatDecade(
                endOfDecade,
                local.decadeLabelFormat!
              )}`
        }
        __preventFocus={local.__preventFocus}
        __stopPropagation={local.__stopPropagation}
        nextIcon={local.nextIcon}
        previousIcon={local.previousIcon}
        nextLabel={local.nextLabel}
        previousLabel={local.previousLabel}
        onNext={local.onNext}
        onPrevious={local.onPrevious}
        nextDisabled={_nextDisabled}
        previousDisabled={_previousDisabled}
        hasNextLevel={false}
        levelControlAriaLabel={local.levelControlAriaLabel}
        withNext={local.withNext}
        withPrevious={local.withPrevious}
        {...stylesApiProps}
      />

      <YearsList
        decade={local.decade}
        locale={local.locale}
        minDate={local.minDate}
        maxDate={local.maxDate}
        yearsListFormat={local.yearsListFormat}
        getYearControlProps={local.getYearControlProps}
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

DecadeLevel.classes = { ...YearsList.classes, ...CalendarHeader.classes };
DecadeLevel.displayName = '@empoleon/dates/DecadeLevel';
