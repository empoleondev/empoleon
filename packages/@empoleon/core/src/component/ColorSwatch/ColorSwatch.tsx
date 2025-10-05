import { splitProps, JSX } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  getRadius,
  EmpoleonRadius,
  polymorphicFactory,
  PolymorphicFactory,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './ColorSwatch.module.css';

export type ColorSwatchStylesNames =
  | 'root'
  | 'alphaOverlay'
  | 'shadowOverlay'
  | 'colorOverlay'
  | 'childrenOverlay';

export type ColorSwatchCssVariables = {
  root: '--cs-radius' | '--cs-size';
};

export interface ColorSwatchProps extends BoxProps, StylesApiProps<ColorSwatchFactory> {
  /** Color to display, not related to `theme.colors` – supports only CSS color values */
  color: string;

  /** Controls `width` and `height` of the swatch, any valid CSS value, numbers are converted to rem */
  size?: JSX.CSSProperties['width'];

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem */
  radius?: EmpoleonRadius;

  /** Determines whether the swatch should have inner `box-shadow`, `true` by default */
  withShadow?: boolean;

  /** Content rendered inside the swatch */
  children?: JSX.Element;
}

export type ColorSwatchFactory = PolymorphicFactory<{
  props: ColorSwatchProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: ColorSwatchStylesNames;
  vars: ColorSwatchCssVariables;
}>;

const defaultProps: Partial<ColorSwatchProps> = {
  withShadow: true,
};

const varsResolver = createVarsResolver<ColorSwatchFactory>((_, props) => ({
  root: {
    '--cs-radius': props.radius === undefined ? undefined : getRadius(props.radius),
    '--cs-size': rem(props.size),
  },
}));

export const ColorSwatch = polymorphicFactory<ColorSwatchFactory>(_props => {
  const props = useProps('ColorSwatch', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'color',
    'size',
    'radius',
    'withShadow',
    'children',
    'variant',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<ColorSwatchFactory>({
    name: 'ColorSwatch',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  return (
    <Box
      ref={local.ref}
      variant={local.variant}
      size={local.size}
      {...getStyles('root', { focusable: true })}
      {...others}
    >
      <Box component="span" {...getStyles('alphaOverlay')} />
      {local.withShadow && <Box component="span" {...getStyles('shadowOverlay')} />}
      <Box component="span" {...getStyles('colorOverlay', { style: { 'background-color': local.color } })} />
      <Box component="span" {...getStyles('childrenOverlay')}>{local.children}</Box>
    </Box>
  );
});

ColorSwatch.classes = classes;
ColorSwatch.displayName = '@empoleon/core/ColorSwatch';
