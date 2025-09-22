import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSize,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './Kbd.module.css';

export type KbdStylesNames = 'root';
export type KbdCssVariables = {
  root: '--kbd-fz';
};

export interface KbdProps extends BoxProps, StylesApiProps<KbdFactory>, ElementProps<'kbd'> {
  /** Controls `font-size` and `padding`, `'sm'` by default */
  size?: EmpoleonSize | number | (string & {});
}

export type KbdFactory = Factory<{
  props: KbdProps;
  ref: HTMLElement;
  stylesNames: KbdStylesNames;
  vars: KbdCssVariables;
}>;

const defaultProps: Partial<KbdProps> = {};

const varsResolver = createVarsResolver<KbdFactory>((_, props) => ({
  root: { '--kbd-fz': getSize(props.size, 'kbd-fz') },
}));

export const Kbd = factory<KbdFactory>(_props => {
  const props = useProps('Kbd', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<KbdFactory>({
    name: 'Kbd',
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

  return <Box component="kbd" ref={local.ref} {...getStyles('root')} {...others} />;
});

Kbd.classes = classes;
Kbd.displayName = '@empoleon/core/Kbd';
