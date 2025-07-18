import { splitProps, JSX, onMount } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSpacing,
  EmpoleonSpacing,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './Stack.module.css';

export type StackStylesNames = 'root';
export type StackCssVariables = {
  root: '--stack-gap' | '--stack-align' | '--stack-justify';
};

export interface StackProps extends BoxProps, StylesApiProps<StackFactory>, ElementProps<'div'> {
  /** Key of `theme.spacing` or any valid CSS value to set `gap` property, numbers are converted to rem, `'md'` by default */
  gap?: EmpoleonSpacing;

  /** Controls `align-items` CSS property, `'stretch'` by default */
  align?: JSX.CSSProperties['align-items'];

  /** Controls `justify-content` CSS property, `'flex-start'` by default */
  justify?: JSX.CSSProperties['justify-content'];
}

export type StackFactory = Factory<{
  props: StackProps;
  ref: HTMLDivElement;
  stylesNames: StackStylesNames;
  vars: StackCssVariables;
}>;

const defaultProps: Partial<StackProps> = {
  gap: 'md',
  align: 'stretch',
  justify: 'flex-start',
};

const varsResolver = createVarsResolver<StackFactory>((_, { gap, align, justify }) => ({
  root: {
    '--stack-gap': getSpacing(gap),
    '--stack-align': align,
    '--stack-justify': justify,
  },
}));

export const Stack = factory<StackFactory>(_props => {
  const props = useProps('Stack', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'align',
    'justify',
    'gap',
    'variant',
    'ref'
  ]);

  const getStyles = useStyles<StackFactory>({
    name: 'Stack',
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

  return <Box ref={local.ref} {...getStyles('root')} variant={local.variant} {...others} />;
});

Stack.classes = classes;
Stack.displayName = '@empoleon/core/Stack';
