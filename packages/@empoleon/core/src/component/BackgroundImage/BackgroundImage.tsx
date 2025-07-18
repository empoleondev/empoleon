import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  getRadius,
  EmpoleonRadius,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './BackgroundImage.module.css';

export type BackgroundImageStylesNames = 'root';
export type BackgroundImageCssVariables = {
  root: '--bi-radius';
};

export interface BackgroundImageProps extends BoxProps, StylesApiProps<BackgroundImageFactory> {
  /** Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem, `0` by default */
  radius?: EmpoleonRadius;

  /** Image url */
  src: string;
}

export type BackgroundImageFactory = PolymorphicFactory<{
  props: BackgroundImageProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: BackgroundImageStylesNames;
  vars: BackgroundImageCssVariables;
}>;

const defaultProps: Partial<BackgroundImageProps> = {};

const varsResolver = createVarsResolver<BackgroundImageFactory>((_, { radius }) => ({
  root: { '--bi-radius': radius === undefined ? undefined : getRadius(radius) },
}));

export const BackgroundImage = polymorphicFactory<BackgroundImageFactory>(_props => {
  const props = useProps('BackgroundImage', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'radius',
    'src',
    'variant',
    'ref'
  ]);

  const getStyles = useStyles<BackgroundImageFactory>({
    name: 'BackgroundImage',
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
      ref={local.ref}
      variant={local.variant}
      {...getStyles('root', { style: { 'background-image': `url(${local.src})` } })}
      {...others}
    />
  );
});

BackgroundImage.classes = classes;
BackgroundImage.displayName = '@empoleon/core/BackgroundImage';
