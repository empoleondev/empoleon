import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  ElementProps,
  EmpoleonSize,
  factory,
  Factory,
  StylesApiProps,
  useProps,
  useStyles,
} from '@empoleon/core';
import classes from './LevelsGroup.module.css';

export type LevelsGroupStylesNames = 'levelsGroup';

export interface LevelsGroupProps
  extends BoxProps,
    StylesApiProps<LevelsGroupFactory>,
    ElementProps<'div'> {
  __staticSelector?: string;
  size?: EmpoleonSize;
}

export type LevelsGroupFactory = Factory<{
  props: LevelsGroupProps;
  ref: HTMLDivElement;
  stylesNames: LevelsGroupStylesNames;
}>;

const defaultProps: Partial<LevelsGroupProps> = {};

export const LevelsGroup = factory<LevelsGroupFactory>((_props) => {
  const props = useProps('LevelsGroup', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    '__staticSelector',
    'attributes',
    'ref',
  ]);

  const getStyles = useStyles<LevelsGroupFactory>({
    name: local.__staticSelector || 'LevelsGroup',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    rootSelector: 'levelsGroup',
  });

  return <Box ref={local.ref} {...getStyles('levelsGroup')} {...others} />;
});

LevelsGroup.classes = classes;
LevelsGroup.displayName = '@empoleon/dates/LevelsGroup';
