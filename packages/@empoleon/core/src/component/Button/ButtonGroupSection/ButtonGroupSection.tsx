import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getFontSize,
  getRadius,
  getSize,
  EmpoleonGradient,
  EmpoleonRadius,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import type { ButtonVariant } from '../Button';
import classes from '../Button.module.css';

export type ButtonGroupSectionStylesNames = 'groupSection';
export type ButtonGroupSectionCssVariables = {
  groupSection:
    | '--section-radius'
    | '--section-bg'
    | '--section-color'
    | '--section-bd'
    | '--section-height'
    | '--section-padding-x'
    | '--section-fz';
};

export interface ButtonGroupSectionProps
  extends BoxProps,
    StylesApiProps<ButtonGroupSectionFactory>,
    ElementProps<'div'> {
  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Gradient configuration used when `variant="gradient"`, default value is `theme.defaultGradient` */
  gradient?: EmpoleonGradient;

  /** Determines whether section text color with filled variant should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;

  /** Controls section `height`, `font-size` and horizontal `padding`, `'sm'` by default */
  size?: EmpoleonSize | `compact-${EmpoleonSize}` | (string & {});
}

export type ButtonGroupSectionFactory = Factory<{
  props: ButtonGroupSectionProps;
  ref: HTMLDivElement;
  stylesNames: ButtonGroupSectionStylesNames;
  vars: ButtonGroupSectionCssVariables;
  variant: ButtonVariant;
}>;

const defaultProps: Partial<ButtonGroupSectionProps> = {};

const varsResolver = createVarsResolver<ButtonGroupSectionFactory>(
  (theme, { radius, color, gradient, variant, autoContrast, size }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || 'filled',
      autoContrast,
    });

    return {
      groupSection: {
        '--section-height': getSize(size, 'section-height'),
        '--section-padding-x': getSize(size, 'section-padding-x'),
        '--section-fz': size?.includes('compact')
          ? getFontSize(size.replace('compact-', ''))
          : getFontSize(size),
        '--section-radius': radius === undefined ? undefined : getRadius(radius),
        '--section-bg': color || variant ? colors.background : undefined,
        '--section-color': colors.color,
        '--section-bd': color || variant ? colors.border : undefined,
      },
    };
  }
);

export const ButtonGroupSection = factory<ButtonGroupSectionFactory>(_props => {
  const props = useProps('ButtonGroupSection', defaultProps, _props);

  const [local, others] = splitProps(props, [
    'className',
    'style',
    'classNames',
    'styles',
    'unstyled',
    'vars',
    'variant',
    'gradient',
    'radius',
    'autoContrast',
    'ref'
  ]);

  const getStyles = useStyles<ButtonGroupSectionFactory>({
    name: 'ButtonGroupSection',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
    rootSelector: 'groupSection',
  });

  return <Box {...getStyles('groupSection')} ref={local.ref} variant={local.variant} {...others} />;
});

ButtonGroupSection.classes = classes;
ButtonGroupSection.displayName = '@empoleon/core/ButtonGroupSection';
