import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './VisuallyHidden.module.css';

export type VisuallyHiddenStylesNames = 'root';

export interface VisuallyHiddenProps
  extends BoxProps,
    StylesApiProps<VisuallyHiddenFactory>,
    ElementProps<'span'> {}

export type VisuallyHiddenFactory = Factory<{
  props: VisuallyHiddenProps;
  ref: HTMLDivElement;
  stylesNames: VisuallyHiddenStylesNames;
}>;

const defaultProps: Partial<VisuallyHiddenProps> = {};

export const VisuallyHidden = factory<VisuallyHiddenFactory>(_props => {
  const props = useProps('VisuallyHidden', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'ref'
  ]);

  const getStyles = useStyles<VisuallyHiddenFactory>({
    name: 'VisuallyHidden',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
  });

  return <Box component="span" ref={local.ref} {...getStyles('root')} {...others} />;
});

VisuallyHidden.classes = classes;
VisuallyHidden.displayName = '@empoleon/core/VisuallyHidden';
