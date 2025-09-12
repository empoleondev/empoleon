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
import { toDateString } from '../../utils';
import { useDatesContext } from '../DatesProvider';
import { PickerControl, PickerControlProps } from '../PickerControl';
import { getMonthInTabOrder } from './get-month-in-tab-order/get-month-in-tab-order';
import { getMonthsData } from './get-months-data/get-months-data';
import { isMonthDisabled } from './is-month-disabled/is-month-disabled';
import classes from './MonthsList.module.css';
import { createMemo, For, splitProps } from 'solid-js';

export type MonthsListStylesNames =
  | 'monthsList'
  | 'monthsListCell'
  | 'monthsListRow'
  | 'monthsListControl';

export interface MonthsListSettings extends ControlsGroupSettings {
  /** dayjs format for months list */
  monthsListFormat?: string;

  /** Passes props down month picker control */
  getMonthControlProps?: (date: DateStringValue) => Partial<PickerControlProps>;

  /** Determines whether controls should be separated, `true` by default */
  withCellSpacing?: boolean;
}

export interface MonthsListProps
  extends BoxProps,
    MonthsListSettings,
    StylesApiProps<MonthsListFactory>,
    ElementProps<'table'> {
  __staticSelector?: string;

  /** Prevents focus shift when buttons are clicked */
  __preventFocus?: boolean;

  /** Determines whether propagation for Escape key should be stopped */
  __stopPropagation?: boolean;

  /** Year for which months list should be displayed */
  year: DateStringValue;

  /** Component size */
  size?: EmpoleonSize;
}

export type MonthsListFactory = Factory<{
  props: MonthsListProps;
  ref: HTMLTableElement;
  stylesNames: MonthsListStylesNames;
}>;

const defaultProps = {
  monthsListFormat: 'MMM',
  withCellSpacing: true,
} satisfies Partial<MonthsListProps>;

export const MonthsList = factory<MonthsListFactory>(_props => {
  const props = useProps('MonthsList', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    '__staticSelector',
    'year',
    'monthsListFormat',
    'locale',
    'minDate',
    'maxDate',
    'getMonthControlProps',
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

  const getStyles = useStyles<MonthsListFactory>({
    name: local.__staticSelector || 'MonthsList',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    rootSelector: 'monthsList',
  });

  const ctx = useDatesContext();

  const months = () => getMonthsData(local.year);

  const monthInTabOrder = getMonthInTabOrder({
    months: months(),
    minDate: toDateString(local.minDate)!,
    maxDate: toDateString(local.maxDate)!,
    getMonthControlProps: local.getMonthControlProps,
  });

  return (
    <Box component="table" ref={local.ref} size={local.size} {...getStyles('monthsList')} {...others}>
      <tbody>
        <For each={months()}>
          {(monthsRow, rowIndex) => (
            <tr {...getStyles('monthsListRow')}>
              <For each={monthsRow}>
                {(month, cellIndex) => {
                  const controlProps = createMemo(() => local.getMonthControlProps?.(month));
                  const isMonthInTabOrder = dayjs(month).isSame(monthInTabOrder, 'month');
                  return (
                    <td
                      {...getStyles('monthsListCell')}
                      data-with-spacing={local.withCellSpacing || undefined}
                    >
                      <PickerControl
                        {...getStyles('monthsListControl')}
                        size={local.size}
                        unstyled={local.unstyled}
                        __staticSelector={local.__staticSelector || 'MonthsList'}
                        data-empoleon-stop-propagation={local.__stopPropagation || undefined}
                        disabled={isMonthDisabled({
                          month,
                          minDate: toDateString(local.minDate)!,
                          maxDate: toDateString(local.maxDate)!,
                        })}
                        ref={(node) => local.__getControlRef?.(rowIndex(), cellIndex(), node!)}
                        {...controlProps}
                        onKeyDown={(event) => {
                          const props = controlProps();
                          if (props?.onKeyDown) {
                            (props.onKeyDown as any)(event);
                          }
                          local.__onControlKeyDown?.(event, { rowIndex: rowIndex(), cellIndex: cellIndex(), date: month });
                        }}
                        onClick={(event) => {
                          const props = controlProps();
                          if (props?.onClick) {
                            (props.onClick as any)(event);
                          }
                          local.__onControlClick?.(event, month);
                        }}
                        onMouseEnter={(event) => {
                          const props = controlProps();
                          if (props?.onMouseEnter) {
                            (props.onMouseEnter as any)(event);
                          }
                          local.__onControlMouseEnter?.(event, month);
                        }}
                        onMouseDown={(event) => {
                          const props = controlProps();
                          if (props?.onMouseDown) {
                            (props.onMouseDown as any)(event);
                          }
                          local.__preventFocus && event.preventDefault();
                        }}
                        tabIndex={local.__preventFocus || !isMonthInTabOrder ? -1 : 0}
                      >
                        {dayjs(month).locale(ctx.getLocale(local.locale)).format(local.monthsListFormat)}
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
  )
});

MonthsList.classes = classes;
MonthsList.displayName = '@empoleon/dates/MonthsList';
