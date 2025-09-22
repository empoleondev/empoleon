import { splitProps, JSX } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getRadius,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './Skeleton.module.css';

export type SkeletonStylesNames = 'root';
export type SkeletonCssVariables = {
  root: '--skeleton-width' | '--skeleton-height' | '--skeleton-radius';
};

export interface SkeletonProps
  extends BoxProps,
    StylesApiProps<SkeletonFactory>,
    ElementProps<'div'> {
  /** Determines whether Skeleton overlay should be displayed, `true` by default */
  visible?: boolean;

  /** Skeleton `height`, numbers are converted to rem, `auto` by default */
  height?: JSX.CSSProperties['height'];

  /** Skeleton `width`, numbers are converted to rem, `100%` by default, ignored when `circle` prop is set */
  width?: JSX.CSSProperties['width'];

  /** If set, Skeleton `width` and `border-radius` are equal to its `height`, `false` by default */
  circle?: boolean;

  /** Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem. `theme.defaultRadius` by default. */
  radius?: JSX.CSSProperties['border-radius'];

  /** Determines whether Skeleton should be animated, `true` by default */
  animate?: boolean;
}

export type SkeletonFactory = Factory<{
  props: SkeletonProps;
  ref: HTMLDivElement;
  stylesNames: SkeletonStylesNames;
  vars: SkeletonCssVariables;
}>;

const defaultProps = {
  visible: true,
  animate: true,
} satisfies Partial<SkeletonProps>;

const varsResolver = createVarsResolver<SkeletonFactory>(
  (_, props) => ({
    root: {
      '--skeleton-height': rem(props.height),
      '--skeleton-width': props.circle ? rem(props.height) : rem(props.width),
      '--skeleton-radius': props.circle ? '1000px' : props.radius === undefined ? undefined : getRadius(props.radius),
    },
  })
);

export const Skeleton = factory<SkeletonFactory>(_props => {
  const props = useProps('Skeleton', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'width',
    'height',
    'circle',
    'visible',
    'radius',
    'animate',
    'mod',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<SkeletonFactory>({
    name: 'Skeleton',
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

  return <Box ref={local.ref} {...getStyles('root')} mod={[{ visible: local.visible, animate: local.animate }, local.mod]} {...others} />;
});

Skeleton.classes = classes;
Skeleton.displayName = '@empoleon/core/Skeleton';
