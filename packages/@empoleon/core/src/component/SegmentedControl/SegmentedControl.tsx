import { createEffect, createSignal, JSX, Show, splitProps } from 'solid-js';
import {
  useId,
  useMergedRef,
  useMounted,
  useUncontrolled,
} from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  Factory,
  factory,
  getContrastColor,
  getFontSize,
  getRadius,
  getSize,
  getThemeColor,
  EmpoleonColor,
  EmpoleonRadius,
  EmpoleonSize,
  StylesApiProps,
  useEmpoleonTheme,
  useProps,
  useStyles,
} from '../../core';
import { FloatingIndicator } from '../FloatingIndicator';
import classes from './SegmentedControl.module.css';

export type SegmentedControlStylesNames =
  | 'root'
  | 'input'
  | 'label'
  | 'control'
  | 'indicator'
  | 'innerLabel';
export type SegmentedControlCssVariables = {
  root:
    | '--sc-radius'
    | '--sc-color'
    | '--sc-font-size'
    | '--sc-padding'
    | '--sc-shadow'
    | '--sc-transition-duration'
    | '--sc-transition-timing-function';
};

export interface SegmentedControlItem {
  value: string;
  label: JSX.Element;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends BoxProps,
    StylesApiProps<SegmentedControlFactory>,
    ElementProps<'div', 'onChange'> {
  /** Data based on which controls are rendered */
  data: (string | SegmentedControlItem)[];

  /** Controlled component value */
  value?: string;

  /** Uncontrolled component default value */
  defaultValue?: string;

  /** Called when value changes */
  onChange?: (value: string) => void;

  /** Determines whether the component is disabled */
  disabled?: boolean;

  /** Name of the radio group, by default random name is generated */
  name?: string;

  /** Determines whether the component should take 100% width of its parent, `false` by default */
  fullWidth?: boolean;

  /** Key of `theme.colors` or any valid CSS color, changes color of indicator, by default color is based on current color scheme */
  color?: EmpoleonColor;

  /** Controls `font-size`, `padding` and `height` properties, `'sm'` by default */
  size?: EmpoleonSize | (string & {});

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Indicator `transition-duration` in ms, set `0` to turn off transitions, `200` by default */
  transitionDuration?: number;

  /** Indicator `transition-timing-function` property, `ease` by default */
  transitionTimingFunction?: string;

  /** Determines in which orientation component id displayed, `'horizontal'` by default */
  orientation?: 'vertical' | 'horizontal';

  /** Determines whether the value can be changed */
  readOnly?: boolean;

  /** Determines whether text color should depend on `background-color` of the indicator. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;

  /** Determines whether there should be borders between items, `true` by default */
  withItemsBorders?: boolean;
}

export type SegmentedControlFactory = Factory<{
  props: SegmentedControlProps;
  ref: HTMLDivElement;
  stylesNames: SegmentedControlStylesNames;
  vars: SegmentedControlCssVariables;
}>;

const defaultProps: Partial<SegmentedControlProps> = {
  withItemsBorders: true,
};

const varsResolver = createVarsResolver<SegmentedControlFactory>(
  (theme, { radius, color, transitionDuration, size, transitionTimingFunction }) => ({
    root: {
      '--sc-radius': radius === undefined ? undefined : getRadius(radius),
      '--sc-color': color ? getThemeColor(color, theme) : undefined,
      '--sc-shadow': color ? undefined : 'var(--empoleon-shadow-xs)',
      '--sc-transition-duration':
        transitionDuration === undefined ? undefined : `${transitionDuration}ms`,
      '--sc-transition-timing-function': transitionTimingFunction,
      '--sc-padding': getSize(size, 'sc-padding'),
      '--sc-font-size': getFontSize(size),
    },
  })
);

export const SegmentedControl = factory<SegmentedControlFactory>(_props => {
  const props = useProps('SegmentedControl', defaultProps, _props);
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
    'size',
    'name',
    'disabled',
    'readOnly',
    'fullWidth',
    'orientation',
    'radius',
    'color',
    'transitionDuration',
    'transitionTimingFunction',
    'variant',
    'autoContrast',
    'withItemsBorders',
    'mod',
    'ref'
  ]);

  const getStyles = useStyles<SegmentedControlFactory>({
    name: 'SegmentedControl',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  const theme = useEmpoleonTheme();

  const _data = local.data.map((item) =>
    typeof item === 'string' ? { label: item, value: item } : item
  );

  const [key, setKey] = createSignal(Math.random().toString());

  createEffect(() => {
    local.data.length; // Track data length
    setKey(Math.random().toString());
  });

  const initialized = useMounted();
  const [parent, setParent] = createSignal<HTMLElement | null>(null);
  const [refs, setRefs] = createSignal<Record<string, HTMLElement | null>>({});
  const setElementRef = (element: HTMLElement | null, val: string) => {
    setRefs(prev => ({ ...prev, [val]: element }));
  };

  const [_value, handleValueChange] = useUncontrolled({
    value: () => local.value,
    defaultValue: local.defaultValue!,
    finalValue: Array.isArray(local.data)
      ? (_data.find((item) => !item.disabled)?.value ?? (local.data[0] as any)?.value ?? null)
      : null,
    onChange: local.onChange,
  });

  const uuid = useId(local.name);

  const controls = _data.map((item) => (
    <Box
      {...getStyles('control')}
      mod={{ active: _value() === item.value, orientation: local.orientation }}
    >
      <input
        {...getStyles('input')}
        disabled={local.disabled || item.disabled}
        type="radio"
        name={uuid}
        value={item.value}
        id={`${uuid}-${item.value}`}
        checked={_value() === item.value}
        onChange={() => !local.readOnly && handleValueChange(item.value)}
        data-focus-ring={theme.focusRing}
      />

      <Box
        component="label"
        {...getStyles('label')}
        mod={{
          active: _value() === item.value && !(local.disabled || item.disabled),
          disabled: local.disabled || item.disabled,
          'read-only': local.readOnly,
        }}
        for={`${uuid}-${item.value}`}
        ref={(node) => setElementRef(node, item.value)}
        __vars={{
          '--sc-label-color':
            local.color !== undefined ? getContrastColor({ color: local.color, theme, autoContrast: local.autoContrast }) : undefined,
        }}
      >
        <span {...getStyles('innerLabel')}>{item.label}</span>
      </Box>
    </Box>
  ));

  const mergedRef = useMergedRef(local.ref, (node: any) => setParent(node));

  if (local.data.length === 0) {
    return null;
  }

  return (
    <Box
      {...getStyles('root')}
      variant={local.variant}
      size={local.size}
      ref={mergedRef}
      mod={[
        {
          'full-width': local.fullWidth,
          orientation: local.orientation,
          initialized,
          'with-items-borders': local.withItemsBorders,
        },
        local.mod,
      ]}
      {...others}
      role="radiogroup"
      data-disabled={local.disabled}
    >
      {typeof _value() === 'string' && (
        <Show when={key()}>
          <FloatingIndicator
            target={refs()[_value()]}
            parent={parent()}
            component="span"
            transitionDuration="var(--sc-transition-duration)"
            {...getStyles('indicator')}
          />
        </Show>
      )}

      {controls}
    </Box>
  );
});

SegmentedControl.classes = classes;
SegmentedControl.displayName = '@empoleon/core/SegmentedControl';
