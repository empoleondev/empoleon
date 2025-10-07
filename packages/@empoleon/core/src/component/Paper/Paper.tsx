import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  EmpoleonRadius,
  EmpoleonShadow,
  getRadius,
  getShadow,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './Paper.module.css';

export type PaperStylesNames = 'root';
export type PaperCssVariables = {
  root: '--paper-radius' | '--paper-shadow';
};

export interface PaperBaseProps {
  /** Key of `theme.shadows` or any valid CSS value to set `box-shadow`, `none` by default */
  shadow?: EmpoleonShadow;

  /** Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Determines whether the paper should have border, border color depends on color scheme, `false` by default */
  withBorder?: boolean;
}

export interface PaperProps extends BoxProps, PaperBaseProps, StylesApiProps<PaperFactory> {}

export type PaperFactory = PolymorphicFactory<{
  props: PaperProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: PaperStylesNames;
  vars: PaperCssVariables;
}>;

const defaultProps: Partial<PaperProps> = {};

const varsResolver = createVarsResolver<PaperFactory>((_, props) => ({
  root: {
    '--paper-radius': props.radius === undefined ? undefined : getRadius(props.radius),
    '--paper-shadow': getShadow(props.shadow),
  },
}));

export const Paper = polymorphicFactory<PaperFactory>((_props) => {
  const props = useProps('Paper', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'withBorder',
    'vars',
    'radius',
    'shadow',
    'variant',
    'mod',
    'attributes',
    'ref',
  ]);

  const getStyles = useStyles<PaperFactory>({
    name: 'Paper',
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
      mod={[{ 'data-with-border': local.withBorder }, local.mod]}
      {...getStyles('root')}
      variant={local.variant}
      {...others}
    />
  );
});

Paper.classes = classes;
Paper.displayName = '@empoleon/core/Paper';
