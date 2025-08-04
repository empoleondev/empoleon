import { useId } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  DataAttributes,
  ElementProps,
  extractStyleProps,
  factory,
  Factory,
  getAutoContrastValue,
  getContrastColor,
  getRadius,
  getSize,
  getThemeColor,
  EmpoleonColor,
  EmpoleonRadius,
  EmpoleonSize,
  EmpoleonStyleProp,
  parseThemeColor,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { InlineInput, InlineInputStylesNames } from '../../utils/InlineInput';
import { RadioCard } from './RadioCard/RadioCard';
import { useRadioGroupContext } from './RadioGroup.context';
import { RadioGroup } from './RadioGroup/RadioGroup';
import { RadioIcon, RadioIconProps } from './RadioIcon';
import { RadioIndicator } from './RadioIndicator/RadioIndicator';
import classes from './Radio.module.css';
import { Component, JSX, Ref, splitProps } from 'solid-js';

export type RadioVariant = 'filled' | 'outline';
export type RadioStylesNames = InlineInputStylesNames | 'inner' | 'radio' | 'icon';
export type RadioCssVariables = {
  root:
    | '--radio-size'
    | '--radio-radius'
    | '--radio-color'
    | '--radio-icon-color'
    | '--radio-icon-size';
};

export interface RadioProps
  extends BoxProps,
    StylesApiProps<RadioFactory>,
    ElementProps<'input', 'size' | 'children'> {
  /** Content of the `label` associated with the radio */
  label?: JSX.Element;

  /** Key of `theme.colors` or any valid CSS color to set input color in checked state, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Controls size of the component, `'sm'` by default */
  size?: EmpoleonSize | (string & {});

  /** A component that replaces default check icon */
  icon?: Component<RadioIconProps>;

  /** Props passed down to the root element */
  wrapperProps?: JSX.HTMLAttributes<HTMLDivElement> & DataAttributes;

  /** Position of the label relative to the input, `'right'` by default */
  labelPosition?: 'left' | 'right';

  /** Description displayed below the label */
  description?: JSX.Element;

  /** Error displayed below the label */
  error?: JSX.Element;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius,` "xl" by default */
  radius?: EmpoleonRadius;

  /** Assigns ref of the root element */
  rootRef?: (el: HTMLDivElement | undefined) => void;

  /** Key of `theme.colors` or any valid CSS color to set icon color, by default value depends on `theme.autoContrast` */
  iconColor?: EmpoleonColor;

  /** Determines whether icon color with filled variant should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;
}

export type RadioFactory = Factory<{
  props: RadioProps;
  ref: HTMLInputElement;
  stylesNames: RadioStylesNames;
  vars: RadioCssVariables;
  variant: RadioVariant;
  staticComponents: {
    Group: typeof RadioGroup;
    Card: typeof RadioCard;
    Indicator: typeof RadioIndicator;
  };
}>;

const defaultProps: Partial<RadioProps> = {
  labelPosition: 'right',
};

const varsResolver = createVarsResolver<RadioFactory>(
  (theme, { size, radius, color, iconColor, variant, autoContrast }) => {
    const parsedColor = parseThemeColor({ color: color || theme.primaryColor, theme });
    const outlineColor =
      parsedColor.isThemeColor && parsedColor.shade === undefined
        ? `var(--empoleon-color-${parsedColor.color}-outline)`
        : parsedColor.color;

    return {
      root: {
        '--radio-size': getSize(size, 'radio-size'),
        '--radio-radius': radius === undefined ? undefined : getRadius(radius),
        '--radio-color': variant === 'outline' ? outlineColor : getThemeColor(color, theme),
        '--radio-icon-color': iconColor
          ? getThemeColor(iconColor, theme)
          : getAutoContrastValue(autoContrast, theme)
            ? getContrastColor({ color, theme, autoContrast })
            : undefined,
        '--radio-icon-size': getSize(size, 'radio-icon-size'),
      },
    };
  }
);

export const Radio = factory<RadioFactory>(_props => {
  const props = useProps('Radio', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'id',
    'size',
    'label',
    'labelPosition',
    'description',
    'error',
    'radius',
    'color',
    'variant',
    'disabled',
    'wrapperProps',
    'icon',
    'rootRef',
    'iconColor',
    'onChange',
    'mod',
    'ref'
  ]);

  const Icon = props.icon ?? RadioIcon;

  const getStyles = useStyles<RadioFactory>({
    name: 'Radio',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  const ctx = useRadioGroupContext();

  const contextSize = ctx?.size ?? local.size;
  const componentSize = props.size ? local.size : contextSize;

  const { styleProps, rest } = extractStyleProps(others);
  const uuid = useId(local.id);

  const contextProps = ctx
    ? {
        checked: ctx.value === rest.value,
        name: rest.name ?? ctx.name,
        onChange: (event: Event) => {
          ctx.onChange(event);
          typeof local.onChange === "function" && local.onChange?.(event as Event & { currentTarget: HTMLInputElement; target: HTMLInputElement });
        },
      }
    : {};

  return (
    <InlineInput
      {...getStyles('root')}
      __staticSelector="Radio"
      __stylesApiProps={props}
      id={uuid}
      size={componentSize}
      labelPosition={local.labelPosition}
      label={local.label}
      description={local.description}
      error={local.error}
      disabled={local.disabled}
      classNames={local.classNames}
      styles={local.styles}
      unstyled={local.unstyled}
      data-checked={contextProps.checked || undefined}
      variant={local.variant}
      ref={local.rootRef}
      mod={local.mod}
      {...styleProps}
      {...local.wrapperProps as any}
    >
      <Box {...getStyles('inner')} mod={{ 'label-position': local.labelPosition }}>
        <Box
          {...getStyles('radio', { focusable: true, variant: local.variant })}
          onChange={local.onChange}
          {...rest}
          {...contextProps}
          component="input"
          mod={{ error: !!local.error }}
          ref={local.ref}
          id={uuid}
          disabled={local.disabled}
          type="radio"
        />
        <Icon {...getStyles('icon')} aria-hidden />
      </Box>
    </InlineInput>
  );
});

Radio.classes = classes;
Radio.displayName = '@empoleon/core/Radio';
Radio.Group = RadioGroup;
Radio.Card = RadioCard;
Radio.Indicator = RadioIndicator;
