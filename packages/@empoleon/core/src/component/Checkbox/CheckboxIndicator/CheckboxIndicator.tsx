import { Component, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  EmpoleonColor,
  EmpoleonRadius,
  EmpoleonSize,
  factory,
  Factory,
  getAutoContrastValue,
  getContrastColor,
  getRadius,
  getSize,
  getThemeColor,
  parseThemeColor,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import { useCheckboxCardContext } from '../CheckboxCard/CheckboxCard.context';
import { CheckboxIcon } from '../CheckIcon';
import classes from './CheckboxIndicator.module.css';

export type CheckboxIndicatorStylesNames = 'indicator' | 'icon';
export type CheckboxIndicatorVariant = 'filled' | 'outline';
export type CheckboxIndicatorCssVariables = {
  indicator: '--checkbox-size' | '--checkbox-radius' | '--checkbox-color' | '--checkbox-icon-color';
};

export interface CheckboxIndicatorProps
  extends BoxProps,
    StylesApiProps<CheckboxIndicatorFactory>,
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

  /** Indeterminate state of the checkbox. If set, `checked` prop is ignored. */
  indeterminate?: boolean;

  /** Icon displayed when checkbox is in checked or indeterminate state */
  icon?: Component<{ indeterminate: boolean | undefined; className: string }>;

  /** Determines whether the component should have checked styles */
  checked?: boolean;

  /** Determines whether the component should have disabled styles */
  disabled?: boolean;
}

export type CheckboxIndicatorFactory = Factory<{
  props: CheckboxIndicatorProps;
  ref: HTMLDivElement;
  stylesNames: CheckboxIndicatorStylesNames;
  vars: CheckboxIndicatorCssVariables;
  variant: CheckboxIndicatorVariant;
}>;

const defaultProps: Partial<CheckboxIndicatorProps> = {
  icon: CheckboxIcon,
};

const varsResolver = createVarsResolver<CheckboxIndicatorFactory>((theme, props) => {
  const parsedColor = parseThemeColor({ color: props.color || theme.primaryColor, theme });
  const outlineColor =
    parsedColor.isThemeColor && parsedColor.shade === undefined
      ? `var(--empoleon-color-${parsedColor.color}-outline)`
      : parsedColor.color;

  return {
    indicator: {
      '--checkbox-size': getSize(props.size, 'checkbox-size'),
      '--checkbox-radius': props.radius === undefined ? undefined : getRadius(props.radius),
      '--checkbox-color':
        props.variant === 'outline' ? outlineColor : getThemeColor(props.color, theme),
      '--checkbox-icon-color': props.iconColor
        ? getThemeColor(props.iconColor, theme)
        : getAutoContrastValue(props.autoContrast, theme)
          ? getContrastColor({ color: props.color, theme, autoContrast: props.autoContrast })
          : undefined,
    },
  };
});

export const CheckboxIndicator = factory<CheckboxIndicatorFactory>((_props) => {
  const props = useProps('CheckboxIndicator', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'icon',
    'indeterminate',
    'radius',
    'color',
    'iconColor',
    'autoContrast',
    'checked',
    'mod',
    'variant',
    'disabled',
    'attributes',
    'ref',
  ]);

  const Icon = local.icon!;

  const getStyles = useStyles<CheckboxIndicatorFactory>({
    name: 'CheckboxIndicator',
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

  const ctx = useCheckboxCardContext();

  const checked = () => local.checked;
  const indeterminate = () => local.indeterminate;
  const cardStoreValue = () => ctx?.checked();
  const _checked = () =>
    typeof local.checked === 'boolean' || typeof local.indeterminate === 'boolean'
      ? checked() || indeterminate()
      : cardStoreValue();

  return (
    <Box
      ref={local.ref}
      {...getStyles('indicator', { variant: local.variant })}
      variant={local.variant}
      mod={[{ checked: _checked(), disabled: local.disabled }, local.mod]}
      {...others}
    >
      <Icon indeterminate={indeterminate()} {...getStyles('icon')} />
    </Box>
  );
});

CheckboxIndicator.displayName = '@empoleon/core/CheckboxIndicator';
CheckboxIndicator.classes = classes;
