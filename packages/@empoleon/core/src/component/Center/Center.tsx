import { splitProps, JSX } from 'solid-js';
import {
  Box,
  BoxProps,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './Center.module.css';

export type CenterStylesNames = 'root';

export interface CenterProps extends BoxProps, StylesApiProps<CenterFactory> {
  /** Content that should be centered vertically and horizontally */
  children?: JSX.Element;

  /** Determines whether `inline-flex` should be used instead of `flex`, `false` by default */
  inline?: boolean;
}

export type CenterFactory = PolymorphicFactory<{
  props: CenterProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: CenterStylesNames;
}>;

const defaultProps: Partial<CenterProps> = {};

export const Center = polymorphicFactory<CenterFactory>(_props => {
  const props = useProps('Center', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'inline',
    'mod',
    'ref'
  ]);

  const getStyles = useStyles<CenterFactory>({
    name: 'Center',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
  });

  return <Box ref={local.ref} mod={[{ inline: local.inline }, local.mod]} {...getStyles('root')} {...others} />;
});

Center.classes = classes;
Center.displayName = '@empoleon/core/Center';
