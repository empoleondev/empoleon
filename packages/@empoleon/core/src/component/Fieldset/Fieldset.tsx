import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getRadius,
  EmpoleonRadius,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './Fieldset.module.css';
import { splitProps, JSX } from 'solid-js';

export type FieldsetStylesNames = 'root' | 'legend';
export type FieldsetVariant = 'default' | 'filled' | 'unstyled';
export type FieldsetCSSVariables = {
  root: '--fieldset-radius';
};

export interface FieldsetProps
  extends BoxProps,
    StylesApiProps<FieldsetFactory>,
    ElementProps<'fieldset'> {
  /** Fieldset legend */
  legend?: JSX.Element;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;
}

export type FieldsetFactory = Factory<{
  props: FieldsetProps;
  ref: HTMLFieldSetElement;
  stylesNames: FieldsetStylesNames;
  vars: FieldsetCSSVariables;
  variant: FieldsetVariant;
}>;

const defaultProps: Partial<FieldsetProps> = {
  variant: 'default',
};

const varsResolver = createVarsResolver<FieldsetFactory>((_, { radius }) => ({
  root: {
    '--fieldset-radius': radius === undefined ? undefined : getRadius(radius),
  },
}));

export const Fieldset = factory<FieldsetFactory>(_props => {
  const props = useProps('Fieldset', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'legend',
    'variant',
    'children',
    'ref'
  ]);

  const getStyles = useStyles<FieldsetFactory>({
    name: 'Fieldset',
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

  return (
    <Box
      component="fieldset"
      ref={local.ref}
      variant={local.variant}
      {...getStyles('root', { variant: local.variant })}
      {...others}
    >
      {local.legend && <legend {...getStyles('legend', { variant: local.variant })}>{local.legend}</legend>}
      {local.children}
    </Box>
  );
});

Fieldset.classes = classes;
Fieldset.displayName = '@empoleon/core/Fieldset';
