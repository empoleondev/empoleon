import { JSX } from 'solid-js';
import { createEffect, createSignal, splitProps } from 'solid-js';
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
import classes from './Image.module.css';


export type ImageStylesNames = 'root';
export type ImageCssVariables = {
  root: '--image-radius' | '--image-object-fit';
};

export interface ImageProps extends BoxProps, StylesApiProps<ImageFactory> {
  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `0` by default */
  radius?: EmpoleonRadius;

  /** Controls `object-fit` style, `'cover'` by default */
  fit?: JSX.CSSProperties['object-fit'];

  /** Image url that will be used as a fallback in case `src` prop is not set or image cannot be loaded */
  fallbackSrc?: string;

  /** Image url */
  src?: any;

  /** Called when image fails to load */
  onError?: JSX.EventHandler<HTMLImageElement, Event>;
}

export type ImageFactory = PolymorphicFactory<{
  props: ImageProps;
  defaultRef: HTMLImageElement;
  defaultComponent: 'img';
  stylesNames: ImageStylesNames;
  vars: ImageCssVariables;
}>;

const defaultProps: Partial<ImageProps> = {};

const varsResolver = createVarsResolver<ImageFactory>((_, { radius, fit }) => ({
  root: {
    '--image-radius': radius === undefined ? undefined : getRadius(radius),
    '--image-object-fit': fit,
  },
}));

export const Image = polymorphicFactory<ImageFactory>(_props => {
  const props = useProps('Image', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'onError',
    'src',
    'radius',
    'fit',
    'fallbackSrc',
    'mod',
    'attributes',
    'ref'
  ]);

  const [error, setError] = createSignal(!local.src);

  createEffect(() => setError(!local.src), [local.src]);

  const getStyles = useStyles<ImageFactory>({
    name: 'Image',
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

  if (error() && local.fallbackSrc) {
    return (
      <Box
        component="img"
        ref={local.ref}
        src={local.fallbackSrc}
        {...getStyles('root')}
        onError={local.onError}
        mod={['fallback', local.mod]}
        {...others}
      />
    );
  }

  return (
    <Box
      component="img"
      ref={local.ref}
      {...getStyles('root')}
      src={local.src}
      onError={(event) => {
        local.onError?.(event);
        setError(true);
      }}
      mod={local.mod}
      {...others}
    />
  );
});

Image.classes = classes;
Image.displayName = '@empoleon/core/Image';
