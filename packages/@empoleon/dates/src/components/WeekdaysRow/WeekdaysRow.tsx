import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getFontSize,
  getSpacing,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '@empoleon/core';
import type { DateLabelFormat, DayOfWeek } from '../../types';
import { useDatesContext } from '../DatesProvider';
import { getWeekdayNames } from './get-weekdays-names/get-weekdays-names';
import classes from './WeekdaysRow.module.css';
import { For, splitProps } from 'solid-js';

export type WeekdaysRowStylesNames = 'weekday' | 'weekdaysRow';
export type WeekdaysRowCssVariables = {
  weekdaysRow: '--wr-fz' | '--wr-spacing';
};

export interface WeekdaysRowProps
  extends BoxProps,
    StylesApiProps<WeekdaysRowFactory>,
    ElementProps<'tr'> {
  __staticSelector?: string;

  /** Controls size */
  size?: EmpoleonSize;

  /** dayjs locale */
  locale?: string;

  /** Number 0-6, 0 – Sunday, 6 – Saturday, `1` – Monday by default */
  firstDayOfWeek?: DayOfWeek;

  /** dayjs format to get weekday name, `'dd'` by default */
  weekdayFormat?: DateLabelFormat;

  /** Sets cell type that is used for weekdays, `'th'` by default */
  cellComponent?: 'td' | 'th';

  /** If set, heading for week numbers is displayed */
  withWeekNumbers?: boolean;
}

export type WeekdaysRowFactory = Factory<{
  props: WeekdaysRowProps;
  ref: HTMLTableRowElement;
  stylesNames: WeekdaysRowStylesNames;
  vars: WeekdaysRowCssVariables;
}>;

const defaultProps: Partial<WeekdaysRowProps> = {};

const varsResolver = createVarsResolver<WeekdaysRowFactory>((_, { size }) => ({
  weekdaysRow: {
    '--wr-fz': getFontSize(size),
    '--wr-spacing': getSpacing(size),
  },
}));

export const WeekdaysRow = factory<WeekdaysRowFactory>(_props => {
  const props = useProps('WeekdaysRow', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'locale',
    'firstDayOfWeek',
    'weekdayFormat',
    'cellComponent',
    '__staticSelector',
    'withWeekNumbers',
    'ref'
  ]);

  const CellComponent = local.cellComponent || 'th';

  const getStyles = useStyles<WeekdaysRowFactory>({
    name: local.__staticSelector || 'WeekdaysRow',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
    rootSelector: 'weekdaysRow',
  });

  const ctx = useDatesContext();

  const weekdayNames = getWeekdayNames({
    locale: ctx.getLocale(local.locale),
    format: local.weekdayFormat,
    firstDayOfWeek: ctx.getFirstDayOfWeek(local.firstDayOfWeek),
  });

  return (
    <Box component="tr" ref={local.ref} {...getStyles('weekdaysRow')} {...others}>
      {local.withWeekNumbers && <CellComponent {...getStyles('weekday')}>#</CellComponent>}
      <For each={weekdayNames}>
        {(weekday, index) => (
          <CellComponent {...getStyles('weekday')}>
            {weekday}
          </CellComponent>
        )}
      </For>
    </Box>
  );
});

WeekdaysRow.classes = classes;
WeekdaysRow.displayName = '@empoleon/dates/WeekdaysRow';
