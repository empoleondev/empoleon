import dayjs from 'dayjs';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getFontSize,
  getSize,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '@empoleon/core';
import { ControlKeydownPayload, DateLabelFormat, DateStringValue, DayOfWeek } from '../../types';
import { toDateString } from '../../utils';
import { useDatesContext } from '../DatesProvider';
import { Day, DayProps, DayStylesNames, RenderDay } from '../Day';
import { WeekdaysRow } from '../WeekdaysRow';
import { getDateInTabOrder } from './get-date-in-tab-order/get-date-in-tab-order';
import { getMonthDays } from './get-month-days/get-month-days';
import { getWeekNumber } from './get-week-number/get-week-number';
import { isAfterMinDate } from './is-after-min-date/is-after-min-date';
import { isBeforeMaxDate } from './is-before-max-date/is-before-max-date';
import { isSameMonth } from './is-same-month/is-same-month';
import classes from './Month.module.css';
import { For, splitProps } from 'solid-js';

export type MonthStylesNames =
  | 'month'
  | 'weekday'
  | 'weekdaysRow'
  | 'monthRow'
  | 'month'
  | 'monthThead'
  | 'monthTbody'
  | 'monthCell'
  | 'weekNumber'
  | DayStylesNames;

export interface MonthSettings {
  /** Determines whether propagation for Escape key should be stopped */
  __stopPropagation?: boolean;

  /** Prevents focus shift when buttons are clicked */
  __preventFocus?: boolean;

  /** Called when day is clicked with click event and date */
  __onDayClick?: (event: MouseEvent, date: DateStringValue) => void;

  /** Called when mouse enters day */
  __onDayMouseEnter?: (event: MouseEvent, date: DateStringValue) => void;

  /** Called when any keydown event is registered on day, used for arrows navigation */
  __onDayKeyDown?: (
    event: KeyboardEvent,
    payload: ControlKeydownPayload
  ) => void;

  /** Assigns ref of every day based on its position in the table, used for arrows navigation */
  __getDayRef?: (rowIndex: number, cellIndex: number, node: HTMLButtonElement) => void;

  /** dayjs locale, the default value is defined by `DatesProvider` */
  locale?: string;

  /** Number 0-6, where 0 – Sunday and 6 – Saturday. 1 – Monday by default */
  firstDayOfWeek?: DayOfWeek;

  /** dayjs format for weekdays names, `'dd'` by default */
  weekdayFormat?: DateLabelFormat;

  /** Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday. The default value is defined by `DatesProvider` */
  weekendDays?: DayOfWeek[];

  /** Passes props down to `Day` components */
  getDayProps?: (
    date: DateStringValue
  ) => Omit<Partial<DayProps>, 'classNames' | 'styles' | 'vars'>;

  /** Callback function to determine whether the day should be disabled */
  excludeDate?: (date: DateStringValue) => boolean;

  /** Minimum possible date, in `YYYY-MM-DD` format */
  minDate?: DateStringValue | Date;

  /** Maximum possible date, in `YYYY-MM-DD` format */
  maxDate?: DateStringValue | Date;

  /** Controls day value rendering */
  renderDay?: RenderDay;

  /** Determines whether outside dates should be hidden, `false` by default */
  hideOutsideDates?: boolean;

  /** Determines whether weekdays row should be hidden, `false` by default */
  hideWeekdays?: boolean;

  /** Assigns `aria-label` to `Day` components based on date */
  getDayAriaLabel?: (date: DateStringValue) => string;

  /** Controls size */
  size?: EmpoleonSize;

  /** Determines whether controls should be separated by space, `true` by default */
  withCellSpacing?: boolean;

  /** Determines whether today should be highlighted with a border, `false` by default */
  highlightToday?: boolean;

  /** Determines whether week numbers should be displayed, `false` by default */
  withWeekNumbers?: boolean;
}

export interface MonthProps
  extends BoxProps,
    MonthSettings,
    StylesApiProps<MonthFactory>,
    ElementProps<'div'> {
  __staticSelector?: string;

  /** Month to display, value `YYYY-MM-DD` */
  month: DateStringValue;

  /** Determines whether days should be static, static days can be used to display month if it is not expected that user will interact with the component in any way  */
  static?: boolean;
}

export type MonthFactory = Factory<{
  props: MonthProps;
  ref: HTMLTableElement;
  stylesNames: MonthStylesNames;
}>;

const defaultProps = {
  withCellSpacing: true,
} satisfies Partial<MonthProps>;

const varsResolver = createVarsResolver<MonthFactory>((_, { size }) => ({
  weekNumber: {
    '--wn-fz': getFontSize(size),
    '--wn-size': getSize(size, 'wn-size'),
  },
}));

export const Month = factory<MonthFactory>(_props => {
  const props = useProps('Month', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    '__staticSelector',
    'locale',
    'firstDayOfWeek',
    'weekdayFormat',
    'month',
    'weekendDays',
    'getDayProps',
    'excludeDate',
    'minDate',
    'maxDate',
    'renderDay',
    'hideOutsideDates',
    'hideWeekdays',
    'getDayAriaLabel',
    'static',
    '__getDayRef',
    '__onDayKeyDown',
    '__onDayClick',
    '__onDayMouseEnter',
    '__preventFocus',
    '__stopPropagation',
    'withCellSpacing',
    'size',
    'highlightToday',
    'withWeekNumbers',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<MonthFactory>({
    name: local.__staticSelector || 'Month',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
    rootSelector: 'month',
  });

  const ctx = useDatesContext();
  const dates = () => getMonthDays({
    month: local.month,
    firstDayOfWeek: ctx.getFirstDayOfWeek(local.firstDayOfWeek),
    consistentWeeks: ctx.consistentWeeks,
  });

  const dateInTabOrder = getDateInTabOrder({
    dates: dates(),
    minDate: toDateString(local.minDate) as DateStringValue,
    maxDate: toDateString(local.maxDate) as DateStringValue,
    getDayProps: local.getDayProps,
    excludeDate: local.excludeDate,
    hideOutsideDates: local.hideOutsideDates,
    month: local.month,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<MonthFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  return (
    <Box component="table" {...getStyles('month')} size={local.size} ref={local.ref} {...others}>
      {!local.hideWeekdays && (
        <thead {...getStyles('monthThead')}>
          <WeekdaysRow
            __staticSelector={local.__staticSelector || 'Month'}
            locale={local.locale}
            firstDayOfWeek={local.firstDayOfWeek}
            weekdayFormat={local.weekdayFormat}
            size={local.size}
            classNames={resolvedClassNames}
            styles={resolvedStyles}
            unstyled={local.unstyled}
            withWeekNumbers={local.withWeekNumbers}
          />
        </thead>
      )}
      <tbody {...getStyles('monthTbody')}>
        <For each={dates()}>
          {(row, rowIndex) => (
            <tr {...getStyles('monthRow')}>
              {local.withWeekNumbers && (
                <td {...getStyles('weekNumber')}>{getWeekNumber(row)}</td>
              )}
              <For each={row}>
                {(date, cellIndex) => {
                  const outside = !isSameMonth(date, local.month);
                  const ariaLabel =
                    local.getDayAriaLabel?.(date) ||
                    dayjs(date)
                      .locale(local.locale || ctx.locale)
                      .format('D MMMM YYYY');
                  const dayProps = () => local.getDayProps?.(date);
                  const isDateInTabOrder = dayjs(date).isSame(dateInTabOrder, 'date');

                  return (
                    <td
                      {...getStyles('monthCell')}
                      data-with-spacing={local.withCellSpacing || undefined}
                    >
                      <Day
                        __staticSelector={local.__staticSelector || 'Month'}
                        classNames={resolvedClassNames}
                        styles={resolvedStyles}
                        unstyled={local.unstyled}
                        data-empoleon-stop-propagation={local.__stopPropagation || undefined}
                        highlightToday={local.highlightToday}
                        renderDay={local.renderDay}
                        date={date}
                        size={local.size}
                        weekend={ctx.getWeekendDays(local.weekendDays).includes(dayjs(date).get('day') as DayOfWeek)}
                        outside={outside}
                        hidden={local.hideOutsideDates ? outside : false}
                        aria-label={ariaLabel}
                        static={local.static}
                        disabled={
                          local.excludeDate?.(date) ||
                          !isBeforeMaxDate(date, toDateString(local.maxDate)!) ||
                          !isAfterMinDate(date, toDateString(local.minDate)!)
                        }
                        ref={(node) => local.__getDayRef?.(rowIndex(), cellIndex(), node!)}
                        {...dayProps()}
                        onKeyDown={(event) => {
                          const props = dayProps();
                          if (props?.onKeyDown) {
                            (props.onKeyDown as any)(event);
                          }
                          local.__onDayKeyDown?.(event, { rowIndex: rowIndex(), cellIndex: cellIndex(), date });
                        }}
                        onMouseEnter={(event) => {
                          const props = dayProps();
                          if (props?.onMouseEnter) {
                            (props.onMouseEnter as any)(event);
                          }
                          local.__onDayMouseEnter?.(event, date);
                        }}
                        onClick={(event) => {
                          const props = dayProps();
                          if (props?.onClick) {
                            (props.onClick as any)(event);
                          }
                          local.__onDayClick?.(event, date);
                        }}
                        onMouseDown={(event) => {
                          const props = dayProps();
                          if (props?.onMouseDown) {
                            (props.onMouseDown as any)(event);
                          }
                          local.__preventFocus && event.preventDefault();
                        }}
                        tabIndex={local.__preventFocus || !isDateInTabOrder ? -1 : 0}
                      />
                    </td>
                  );
                }}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </Box>
  );
});

Month.classes = classes;
Month.displayName = '@empoleon/dates/Month';
