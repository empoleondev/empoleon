import { splitProps, JSX } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getRadius,
  getSize,
  EmpoleonColor,
  EmpoleonGradient,
  EmpoleonRadius,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './ThemeIcon.module.css';

export type ThemeIconStylesNames = 'root';
export type ThemeIconVariant =
  | 'filled'
  | 'light'
  | 'outline'
  | 'transparent'
  | 'white'
  | 'default'
  | 'gradient';

export type ThemeIconCssVariables = {
  root: '--ti-radius' | '--ti-size' | '--ti-bg' | '--ti-color' | '--ti-bd';
};

export interface ThemeIconProps
  extends BoxProps,
    StylesApiProps<ThemeIconFactory>,
    ElementProps<'div'> {
  /** Controls width and height of the button. Numbers are converted to rem. `'md'` by default. */
  size?: EmpoleonSize | (string & {}) | number;

  /** Key of `theme.colors` or any valid CSS color. Default value is `theme.primaryColor`.  */
  color?: EmpoleonColor;

  /** Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem. `theme.defaultRadius` by default. */
  radius?: EmpoleonRadius;

  /** Gradient data used when `variant="gradient"`, default value is `theme.defaultGradient` */
  gradient?: EmpoleonGradient;

  /** Icon displayed inside the component */
  children?: JSX.Element;

  /** Determines whether button text color with filled variant should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;
}

export type ThemeIconFactory = Factory<{
  props: ThemeIconProps;
  ref: HTMLDivElement;
  stylesNames: ThemeIconStylesNames;
  vars: ThemeIconCssVariables;
  variant: ThemeIconVariant;
}>;

const varsResolver = createVarsResolver<ThemeIconFactory>(
  (theme, props) => {
    const colors = theme.variantColorResolver({
      color: props.color || theme.primaryColor,
      theme,
      gradient: props.gradient,
      variant: props.variant || 'filled',
      autoContrast: props.autoContrast,
    });

    return {
      root: {
        '--ti-size': getSize(props.size, 'ti-size'),
        '--ti-radius': props.radius === undefined ? undefined : getRadius(props.radius),
        '--ti-bg': props.color || props.variant ? colors.background : undefined,
        '--ti-color': props.color || props.variant ? colors.color : undefined,
        '--ti-bd': props.color || props.variant ? colors.border : undefined,
      },
    };
  }
);

export const ThemeIcon = factory<ThemeIconFactory>(_props => {
  const props = useProps('ThemeIcon', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'autoContrast',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<ThemeIconFactory>({
    name: 'ThemeIcon',
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

  return <Box ref={local.ref} {...getStyles('root')} {...others} />;
});

ThemeIcon.classes = classes;
ThemeIcon.displayName = '@empoleon/core/ThemeIcon';
