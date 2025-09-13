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
import classes from './Typography.module.css';

export type TypographyStylesNames = 'root';

export interface TypographyProps
  extends BoxProps,
    StylesApiProps<TypographyFactory>,
    ElementProps<'div'> {}

export type TypographyFactory = Factory<{
  props: TypographyProps;
  ref: HTMLDivElement;
  stylesNames: TypographyStylesNames;
}>;

export const Typography = factory<TypographyFactory>(_props => {
  const props = useProps('Typography', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<TypographyFactory>({
    name: 'Typography',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
  });

  return <Box ref={local.ref} {...getStyles('root')} {...others} />;
});

Typography.classes = classes;
Typography.displayName = '@mantine/core/Typography';
