import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  EmpoleonColor,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { getMarkColor } from './get-mark-color';
import classes from './Mark.module.css';

export type MarkStylesNames = 'root';
export type MarkCssVariables = {
  root: '--mark-bg-dark' | '--mark-bg-light';
};

export interface MarkProps extends BoxProps, StylesApiProps<MarkFactory>, ElementProps<'mark'> {
  /** Key of `theme.colors` or any valid CSS color, `yellow` by default */
  color?: EmpoleonColor;
}

export type MarkFactory = Factory<{
  props: MarkProps;
  ref: HTMLElement;
  stylesNames: MarkStylesNames;
  vars: MarkCssVariables;
}>;

const defaultProps: Partial<MarkProps> = {
  color: 'yellow',
};

const varsResolver = createVarsResolver<MarkFactory>((theme, { color }) => ({
  root: {
    '--mark-bg-dark': getMarkColor({ color, theme, defaultShade: 5 }),
    '--mark-bg-light': getMarkColor({ color, theme, defaultShade: 2 }),
  },
}));

export const Mark = factory<MarkFactory>(_props => {
  const props = useProps('Mark', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'color',
    'variant',
    'ref'
  ]);

  const getStyles = useStyles<MarkFactory>({
    name: 'Mark',
    props,
    className: local.className,
    style: local.style,
    classes,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  return <Box component="mark" ref={local.ref} variant={local.variant} {...getStyles('root')} {...others} />;
});

Mark.classes = classes;
Mark.displayName = '@empoleon/core/Mark';
