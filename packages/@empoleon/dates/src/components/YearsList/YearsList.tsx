import { createMemo, For, splitProps } from 'solid-js';
import dayjs from 'dayjs';
import {
  Box,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '@empoleon/core';
import { ControlsGroupSettings, DateStringValue } from '../../types';
import { useDatesContext } from '../DatesProvider';
import { PickerControl, PickerControlProps } from '../PickerControl';
import { getYearInTabOrder } from './get-year-in-tab-order/get-year-in-tab-order';
import { getYearsData } from './get-years-data/get-years-data';
import { isYearDisabled } from './is-year-disabled/is-year-disabled';
import classes from './YearsList.module.css';

export type YearsListStylesNames =
  | 'yearsListControl'
  | 'yearsList'
  | 'yearsListCell'
  | 'yearsListRow';

export interface YearsListSettings extends ControlsGroupSettings {
  /** Prevents focus shift when buttons are clicked */
  __preventFocus?: boolean;

  /** Determines whether propagation for Escape key should be stopped */
  __stopPropagation?: boolean;

  /** dayjs format for years list, `'YYYY'` by default  */
  yearsListFormat?: string;

  /** Passes props down to year picker control based on date */
  getYearControlProps?: (date: DateStringValue) => Partial<PickerControlProps>;

  /** Component size */
  size?: EmpoleonSize;

  /** Determines whether controls should be separated, `true` by default */
  withCellSpacing?: boolean;
}

export interface YearsListProps
  extends BoxProps,
    YearsListSettings,
    StylesApiProps<YearsListFactory>,
    ElementProps<'table'> {
  __staticSelector?: string;

  /** Decade value to display */
  decade: DateStringValue;
}

export type YearsListFactory = Factory<{
  props: YearsListProps;
  ref: HTMLTableElement;
  stylesNames: YearsListStylesNames;
}>;

const defaultProps = {
  yearsListFormat: 'YYYY',
  withCellSpacing: true,
} satisfies Partial<YearsListProps>;

export const YearsList = factory<YearsListFactory>(_props => {
  const props = useProps('YearsList', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'decade',
    'yearsListFormat',
    'locale',
    'minDate',
    'maxDate',
    'getYearControlProps',
    '__staticSelector',
    '__getControlRef',
    '__onControlKeyDown',
    '__onControlClick',
    '__onControlMouseEnter',
    '__preventFocus',
    '__stopPropagation',
    'withCellSpacing',
    'size',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<YearsListFactory>({
    name: local.__staticSelector || 'YearsList',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    attributes: local.attributes,
    rootSelector: 'yearsList',
  });

  const ctx = useDatesContext();

  const years = () => getYearsData(local.decade);

  const yearInTabOrder = getYearInTabOrder({
    years: years(),
    minDate: local.minDate,
    maxDate: local.maxDate,
    getYearControlProps: local.getYearControlProps,
  });

  return (
    <Box component="table" ref={local.ref} size={local.size} {...getStyles('yearsList')} {...others}>
      <tbody>
        <For each={years()}>
          {(yearsRow, rowIndex) => (
            <tr {...getStyles('yearsListRow')}>
              <For each={yearsRow}>
                {(year, cellIndex) => {
                  const controlProps = createMemo(() => local.getYearControlProps?.(year));
                  const isYearInTabOrder = dayjs(year).isSame(yearInTabOrder, 'year');
                  return (
                    <td
                      {...getStyles('yearsListCell')}
                      data-with-spacing={local.withCellSpacing || undefined}
                    >
                      <PickerControl
                        {...getStyles('yearsListControl')}
                        size={local.size}
                        unstyled={local.unstyled}
                        data-empoleon-stop-propagation={local.__stopPropagation || undefined}
                        disabled={isYearDisabled({ year, minDate: local.minDate, maxDate: local.maxDate })}
                        ref={(node) => local.__getControlRef?.(rowIndex(), cellIndex(), node!)}
                        {...controlProps}
                        onKeyDown={(event) => {
                          const props = controlProps();
                          if (props?.onKeyDown) {
                            (props.onKeyDown as any)(event);
                          }
                          local.__onControlKeyDown?.(event, { rowIndex: rowIndex(), cellIndex: cellIndex(), date: year });
                        }}
                        onClick={(event) => {
                          const props = controlProps();
                          if (props?.onClick) {
                            (props.onClick as any)(event);
                          }
                          local.__onControlClick?.(event, year);
                        }}
                        onMouseEnter={(event) => {
                          const props = controlProps();
                          if (props?.onMouseEnter) {
                            (props.onMouseEnter as any)(event);
                          }
                          local.__onControlMouseEnter?.(event, year);
                        }}
                        onMouseDown={(event) => {
                          const props = controlProps();
                          if (props?.onMouseDown) {
                            (props.onMouseDown as any)(event);
                          }
                          local.__preventFocus && event.preventDefault();
                        }}
                        tabIndex={local.__preventFocus || !isYearInTabOrder ? -1 : 0}
                      >
                        {dayjs(year).locale(ctx.getLocale(local.locale)).format(local.yearsListFormat)}
                      </PickerControl>
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

YearsList.classes = classes;
YearsList.displayName = '@empoleon/dates/YearsList';
