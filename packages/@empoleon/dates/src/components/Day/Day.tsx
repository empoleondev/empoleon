import { JSX, splitProps } from 'solid-js';
import dayjs from 'dayjs';
import {
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSize,
  EmpoleonSize,
  StylesApiProps,
  UnstyledButton,
  useProps,
  useStyles,
} from '@empoleon/core';
import { DateStringValue } from '../../types';
import classes from './Day.module.css';

export type RenderDay = (date: DateStringValue) => JSX.Element;

export type DayStylesNames = 'day';
export type DayCssVariables = {
  day: '--day-size';
};

export interface DayProps extends BoxProps, StylesApiProps<DayFactory>, ElementProps<'button'> {
  __staticSelector?: string;

  /** Determines which element is used as root, `'button'` by default, `'div'` if static prop is set */
  static?: boolean;

  /** Date that is displayed in `YYYY-MM-DD` format */
  date: DateStringValue;

  /** Control width and height of the day, `'sm'` by default */
  size?: EmpoleonSize;

  /** Determines whether the day is considered to be a weekend, `false` by default */
  weekend?: boolean;

  /** Determines whether the day is outside of the current month, `false` by default */
  outside?: boolean;

  /** Determines whether the day is selected, `false` by default */
  selected?: boolean;

  /** Determines whether the day should not be displayed, `false` by default */
  hidden?: boolean;

  /** Determines whether the day is selected in range, `false` by default */
  inRange?: boolean;

  /** Determines whether the day is first in range selection, `false` by default */
  firstInRange?: boolean;

  /** Determines whether the day is last in range selection, `false` by default */
  lastInRange?: boolean;

  /** Controls day value rendering */
  renderDay?: RenderDay;

  /** Determines whether today should be highlighted with a border, `false` by default */
  highlightToday?: boolean;
}

export type DayFactory = Factory<{
  props: DayProps;
  ref: HTMLButtonElement;
  stylesNames: DayStylesNames;
  vars: DayCssVariables;
}>;

const defaultProps: Partial<DayProps> = {};

const varsResolver = createVarsResolver<DayFactory>((_, { size }) => ({
  day: {
    '--day-size': getSize(size, 'day-size'),
  },
}));

export const Day = factory<DayFactory>(_props => {
  const props = useProps('Day', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'date',
    'disabled',
    '__staticSelector',
    'weekend',
    'outside',
    'selected',
    'renderDay',
    'inRange',
    'firstInRange',
    'lastInRange',
    'hidden',
    'static',
    'highlightToday',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<DayFactory>({
    name: local.__staticSelector || 'Day',
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
    rootSelector: 'day',
  });

  return (
    <UnstyledButton<any>
      {...getStyles('day', { style: local.hidden ? { display: 'none' } : undefined })}
      component={local.static ? 'div' : 'button'}
      ref={local.ref}
      disabled={local.disabled}
      data-today={dayjs(local.date).isSame(new Date(), 'day') || undefined}
      data-hidden={local.hidden || undefined}
      data-highlight-today={local.highlightToday || undefined}
      data-disabled={local.disabled || undefined}
      data-weekend={(!local.disabled && !local.outside && local.weekend) || undefined}
      data-outside={(!local.disabled && local.outside) || undefined}
      data-selected={(!local.disabled && local.selected) || undefined}
      data-in-range={(local.inRange && !local.disabled) || undefined}
      data-first-in-range={(local.firstInRange && !local.disabled) || undefined}
      data-last-in-range={(local.lastInRange && !local.disabled) || undefined}
      data-static={local.static || undefined}
      unstyled={local.unstyled}
      {...others}
    >
      {local.renderDay?.(local.date) || dayjs(local.date).date()}
    </UnstyledButton>
  );
});

Day.classes = classes;
Day.displayName = '@empoleon/dates/Day';
