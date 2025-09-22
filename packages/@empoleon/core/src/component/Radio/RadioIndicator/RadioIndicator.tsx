import { Component, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
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
  parseThemeColor,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import { useRadioCardContext } from '../RadioCard/RadioCard.context';
import { RadioIcon, RadioIconProps } from '../RadioIcon';
import classes from './RadioIndicator.module.css';

export type RadioIndicatorStylesNames = 'indicator' | 'icon';
export type RadioIndicatorVariant = 'filled' | 'outline';
export type RadioIndicatorCssVariables = {
  indicator:
    | '--radio-size'
    | '--radio-radius'
    | '--radio-color'
    | '--radio-icon-color'
    | '--radio-icon-size';
};

export interface RadioIndicatorProps
  extends BoxProps,
    StylesApiProps<RadioIndicatorFactory>,
    ElementProps<'div'> {
  /** Key of `theme.colors` or any valid CSS color to set input background color in checked state, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Controls size of the component, `'sm'` by default */
  size?: EmpoleonSize | (string & {});

  /** Key of `theme.radius` or any valid CSS value to set `border-radius,` `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Key of `theme.colors` or any valid CSS color to set icon color, by default value depends on `theme.autoContrast` */
  iconColor?: EmpoleonColor;

  /** Determines whether icon color with filled variant should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;

  /** A component that replaces default check icon */
  icon?: Component<RadioIconProps>;

  /** Determines whether the component should have checked styles */
  checked?: boolean;

  /** Determines whether the component should have disabled styles */
  disabled?: boolean;
}

export type RadioIndicatorFactory = Factory<{
  props: RadioIndicatorProps;
  ref: HTMLDivElement;
  stylesNames: RadioIndicatorStylesNames;
  vars: RadioIndicatorCssVariables;
  variant: RadioIndicatorVariant;
}>;

const defaultProps: Partial<RadioIndicatorProps> = {
  icon: RadioIcon,
};

const varsResolver = createVarsResolver<RadioIndicatorFactory>(
  (theme, props) => {
    const parsedColor = parseThemeColor({ color: props.color || theme.primaryColor, theme });
    const outlineColor =
      parsedColor.isThemeColor && parsedColor.shade === undefined
        ? `var(--empoleon-color-${parsedColor.color}-outline)`
        : parsedColor.color;

    return {
      indicator: {
        '--radio-size': getSize(props.size, 'radio-size'),
        '--radio-radius': props.radius === undefined ? undefined : getRadius(props.radius),
        '--radio-color': props.variant === 'outline' ? outlineColor : getThemeColor(props.color, theme),
        '--radio-icon-size': getSize(props.size, 'radio-icon-size'),
        '--radio-icon-color': props.iconColor
          ? getThemeColor(props.iconColor, theme)
          : getAutoContrastValue(props.autoContrast, theme)
            ? getContrastColor({ color: props.color, theme, autoContrast: props.autoContrast })
            : undefined,
      },
    };
  }
);

export const RadioIndicator = factory<RadioIndicatorFactory>(_props => {
  const props = useProps('RadioIndicator', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'icon',
    'radius',
    'color',
    'iconColor',
    'autoContrast',
    'checked',
    'mod',
    'variant',
    'disabled',
    'attributes',
    'ref'
  ]);

  const Icon = local.icon!;

  const getStyles = useStyles<RadioIndicatorFactory>({
    name: 'RadioIndicator',
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
    rootSelector: 'indicator',
  });

  const ctx = useRadioCardContext();
  const _checked = typeof local.checked === 'boolean' ? local.checked : ctx?.checked || false;

  return (
    <Box
      ref={local.ref}
      {...getStyles('indicator', { variant: local.variant })}
      variant={local.variant}
      mod={[{ checked: _checked, disabled: local.disabled }, local.mod]}
      {...others}
    >
      <Icon {...getStyles('icon') as any} />
    </Box>
  );
});

RadioIndicator.displayName = '@empoleon/core/RadioIndicator';
RadioIndicator.classes = classes;
