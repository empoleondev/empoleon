import { JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  EmpoleonColor,
  EmpoleonGradient,
  EmpoleonRadius,
  EmpoleonSize,
  getRadius,
  getSize,
  getThemeColor,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './Badge.module.css';

export type BadgeStylesNames = 'root' | 'section' | 'label';
export type BadgeVariant =
  | 'filled'
  | 'light'
  | 'outline'
  | 'dot'
  | 'transparent'
  | 'white'
  | 'default'
  | 'gradient';

export type BadgeCssVariables = {
  root:
    | '--badge-height'
    | '--badge-padding-x'
    | '--badge-fz'
    | '--badge-radius'
    | '--badge-bg'
    | '--badge-color'
    | '--badge-bd'
    | '--badge-dot-color';
};

export interface BadgeProps extends BoxProps, StylesApiProps<BadgeFactory> {
  /** Controls `font-size`, `height` and horizontal `padding`, `'md'` by default */
  size?: EmpoleonSize | (string & {});

  /** If set, badge `min-width` becomes equal to its `height` and horizontal padding is removed */
  circle?: boolean;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `'xl'` by default */
  radius?: EmpoleonRadius;

  /** Key of `theme.colors` or any valid CSS color, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Gradient configuration used when `variant="gradient"`, default value is `theme.defaultGradient` */
  gradient?: EmpoleonGradient;

  /** Content displayed on the left side of the badge label */
  leftSection?: JSX.Element;

  /** Content displayed on the right side of the badge label */
  rightSection?: JSX.Element;

  /** Determines whether Badge should take 100% of its parent width, `false` by default */
  fullWidth?: boolean;

  /** Main badge content */
  children?: JSX.Element;

  /** Determines whether text color with filled variant should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;
}

export type BadgeFactory = PolymorphicFactory<{
  props: BadgeProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: BadgeStylesNames;
  vars: BadgeCssVariables;
  variant: BadgeVariant;
}>;

const defaultProps: Partial<BadgeProps> = {};

const varsResolver = createVarsResolver<BadgeFactory>((theme, props) => {
  const colors = theme.variantColorResolver({
    color: props.color || theme.primaryColor,
    theme,
    gradient: props.gradient,
    variant: props.variant || 'filled',
    autoContrast: props.autoContrast,
  });

  return {
    root: {
      '--badge-height': getSize(props.size, 'badge-height'),
      '--badge-padding-x': getSize(props.size, 'badge-padding-x'),
      '--badge-fz': getSize(props.size, 'badge-fz'),
      '--badge-radius': props.radius === undefined ? undefined : getRadius(props.radius),
      '--badge-bg': props.color || props.variant ? colors.background : undefined,
      '--badge-color': props.color || props.variant ? colors.color : undefined,
      '--badge-bd': props.color || props.variant ? colors.border : undefined,
      '--badge-dot-color': props.variant === 'dot' ? getThemeColor(props.color, theme) : undefined,
    },
  };
});

export const Badge = polymorphicFactory<BadgeFactory>((_props) => {
  const props = useProps('Badge', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'radius',
    'color',
    'gradient',
    'leftSection',
    'rightSection',
    'children',
    'variant',
    'fullWidth',
    'autoContrast',
    'circle',
    'mod',
    'attributes',
    'ref',
  ]);

  const getStyles = useStyles({
    name: 'Badge',
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

  return (
    <Box
      variant={local.variant}
      mod={[
        {
          block: local.fullWidth,
          circle: local.circle,
          'with-right-section': !!local.rightSection,
          'with-left-section': !!local.leftSection,
        },
        local.mod,
      ]}
      {...getStyles('root', { variant: local.variant })}
      ref={local.ref}
      {...others}
    >
      {local.leftSection && (
        <Box component="span" {...getStyles('section')} data-position="left">
          {local.leftSection}
        </Box>
      )}
      <Box component="span" {...getStyles('label')}>
        {local.children}
      </Box>
      {local.rightSection && (
        <Box component="span" {...getStyles('section')} data-position="right">
          {local.rightSection}
        </Box>
      )}
    </Box>
  );
});

Badge.classes = classes;
Badge.displayName = '@empoleon/core/Badge';
