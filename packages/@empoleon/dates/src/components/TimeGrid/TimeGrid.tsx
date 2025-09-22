import { For, JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  DataAttributes,
  ElementProps,
  factory,
  Factory,
  getFontSize,
  getRadius,
  EmpoleonRadius,
  EmpoleonSize,
  SimpleGrid,
  SimpleGridProps,
  StylesApiProps,
  useProps,
  useStyles,
} from '@empoleon/core';
import { useUncontrolled } from '@empoleon/hooks';
import type { TimePickerAmPmLabels, TimePickerFormat } from '../TimePicker';
import { isSameTime } from '../TimePicker/utils/is-same-time/is-same-time';
import { isTimeAfter, isTimeBefore } from './compare-time';
import { TimeGridProvider } from './TimeGrid.context';
import { TimeGridControl } from './TimeGridControl';
import classes from './TimeGrid.module.css';

export type TimeGridStylesNames = 'root' | 'control' | 'simpleGrid';
export type TimeGridCssVariables = {
  root: '--time-grid-fz' | '--time-grid-radius';
};

export interface TimeGridProps
  extends BoxProps,
    StylesApiProps<TimeGridFactory>,
    ElementProps<'div', 'onChange' | 'value' | 'defaultValue'> {
  /** Time data in 24h format to be displayed in the grid, for example `['10:00', '18:30', '22:00']`. Time values must be unique. */
  data: string[];

  /** Controlled component value */
  value?: string | null;

  /** Uncontrolled component default value */
  defaultValue?: string | null;

  /** Called when value changes */
  onChange?: (value: string | null) => void;

  /** Determines whether the value can be deselected when the current active option is clicked or activated with keyboard, `false` by default */
  allowDeselect?: boolean;

  /** Time format displayed in the grid, `'24h'` by default */
  format?: TimePickerFormat;

  /** Determines whether the seconds part should be displayed, `false` by default */
  withSeconds?: boolean;

  /** Labels used for am/pm values, `{ am: 'AM', pm: 'PM' }` by default */
  amPmLabels?: TimePickerAmPmLabels;

  /** Props passed down to the underlying `SimpleGrid` component, `{ cols: 3, spacing: 'xs' }` by default */
  simpleGridProps?: SimpleGridProps;

  /** A function to pass props down to control based on the time value */
  getControlProps?: (time: string) => JSX.ButtonHTMLAttributes<HTMLButtonElement> & DataAttributes;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Control `font-size` of controls, key of `theme.fontSizes` or any valid CSS value, `'sm'` by default */
  size?: EmpoleonSize;

  /** All controls before this time are disabled */
  minTime?: string;

  /** All controls after this time are disabled */
  maxTime?: string;

  /** Array of time values to disable */
  disableTime?: string[] | ((time: string) => boolean);

  /** If set, all controls are disabled */
  disabled?: boolean;
}

export type TimeGridFactory = Factory<{
  props: TimeGridProps;
  ref: HTMLDivElement;
  stylesNames: TimeGridStylesNames;
  vars: TimeGridCssVariables;
}>;

const defaultProps = {
  simpleGridProps: { cols: 3, spacing: 'xs' },
  format: '24h',
  amPmLabels: { am: 'AM', pm: 'PM' },
} satisfies Partial<TimeGridProps>;

const varsResolver = createVarsResolver<TimeGridFactory>((_theme, props) => ({
  root: {
    '--time-grid-fz': getFontSize(props.size),
    '--time-grid-radius': getRadius(props.radius),
  },
}));

export const TimeGrid = factory<TimeGridFactory>(_props => {
  const props = useProps('TimeGrid', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'data',
    'value',
    'defaultValue',
    'onChange',
    'format',
    'withSeconds',
    'amPmLabels',
    'allowDeselect',
    'simpleGridProps',
    'getControlProps',
    'minTime',
    'maxTime',
    'disableTime',
    'disabled',
    'attributes',
    'ref'
  ]);

  const withSeconds = local.withSeconds || false;

  const getStyles = useStyles<TimeGridFactory>({
    name: 'TimeGrid',
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
  });

  const [_value, setValue] = useUncontrolled({
    value: () => local.value,
    defaultValue: local.defaultValue!,
    finalValue: null,
    onChange: local.onChange,
  });

  return (
    <TimeGridProvider value={{ getStyles }}>
      <Box ref={local.ref} {...getStyles('root')} {...others}>
        <SimpleGrid
          {...local.simpleGridProps}
          {...getStyles('simpleGrid', {
            className: local.simpleGridProps?.className,
            style: local.simpleGridProps?.style,
          })}
        >
          <For each={local.data}>
            {time => {
              const isDisabled =
                local.disabled ||
                (!!local.minTime && isTimeBefore(time, local.minTime)) ||
                (!!local.maxTime && isTimeAfter(time, local.maxTime)) ||
                (Array.isArray(local.disableTime)
                  ? !!local.disableTime.find((t) => isSameTime({ time, compare: t, withSeconds }))
                  : !!local.disableTime?.(time));

              return (
                <TimeGridControl
                  active={isSameTime({ time, compare: _value() || '', withSeconds })}
                  time={time}
                  onClick={() => {
                    const nextValue =
                      local.allowDeselect &&
                      (_value() === null ? time === _value() : isSameTime({ time, compare: _value()!, withSeconds }))
                        ? null
                        : time;
                    nextValue !== _value() && setValue(nextValue);
                  }}
                  format={local.format!}
                  amPmLabels={local.amPmLabels!}
                  disabled={isDisabled}
                  data-disabled={isDisabled || undefined}
                  withSeconds={withSeconds}
                  {...local.getControlProps?.(time)}
                />
              );
            }}
          </For>
        </SimpleGrid>
      </Box>
    </TimeGridProvider>
  );
});

TimeGrid.displayName = '@empoleon/dates/TimeGrid';
TimeGrid.classes = classes;
