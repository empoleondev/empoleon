import { splitProps, JSX } from 'solid-js';
import {
  Box,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import classes from '../Input.module.css';

export type InputPlaceholderStylesNames = 'placeholder';

export interface InputPlaceholderProps
  extends BoxProps,
    StylesApiProps<InputPlaceholderFactory>,
    ElementProps<'span'> {
  __staticSelector?: string;

  /** If set, the placeholder will have error styles, `false` by default */
  error?: JSX.Element;
}

export type InputPlaceholderFactory = Factory<{
  props: InputPlaceholderProps;
  ref: HTMLSpanElement;
  stylesNames: InputPlaceholderStylesNames;
}>;

const defaultProps: Partial<InputPlaceholderProps> = {};

export const InputPlaceholder = factory<InputPlaceholderFactory>(_props => {
  const props = useProps('InputPlaceholder', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    '__staticSelector',
    'variant',
    'error',
    'mod',
    'ref'
  ]);

  const getStyles = useStyles<InputPlaceholderFactory>({
    name: ['InputPlaceholder', local.__staticSelector],
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    rootSelector: 'placeholder',
  });

  return (
    <Box
      {...getStyles('placeholder')}
      mod={[{ error: !!local.error }, local.mod]}
      component="span"
      variant={local.variant}
      ref={local.ref}
      {...others}
    />
  );
});

InputPlaceholder.classes = classes;
InputPlaceholder.displayName = '@empoleon/core/InputPlaceholder';
