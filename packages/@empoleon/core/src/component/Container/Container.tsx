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
import classes from './Container.module.css';

export type ContainerStylesNames = 'root';
export type ContainerCssVariables = {
  root: '--container-size';
};

export interface ContainerProps
  extends BoxProps,
    StylesApiProps<ContainerFactory>,
    ElementProps<'div'> {
  /** Sets `max-width` of the container, value is not responsive – it is the same for all screen sizes. Numbers are converted to rem. Ignored when `fluid` prop is set. `'md'` by default */
  size?: EmpoleonSize | (string & {}) | number;

  /** Determines whether the container should take 100% of its parent width. If set, `size` prop is ignored. `false` by default. */
  fluid?: boolean;
}

export type ContainerFactory = Factory<{
  props: ContainerProps;
  ref: HTMLDivElement;
  stylesNames: ContainerStylesNames;
  vars: ContainerCssVariables;
}>;

const defaultProps: Partial<ContainerProps> = {};

const varsResolver = createVarsResolver<ContainerFactory>((_, { size, fluid }) => ({
  root: {
    '--container-size': fluid ? undefined : getSize(size, 'container-size'),
  },
}));

export const Container = factory<ContainerFactory>(_props => {
  const props = useProps('Container', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'fluid',
    'mod',
    'ref'
  ]);

  const getStyles = useStyles<ContainerFactory>({
    name: 'Container',
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

  return <Box ref={local.ref} mod={[{ fluid: local.fluid }, local.mod]} {...getStyles('root')} {...others} />;
});

Container.classes = classes;
Container.displayName = '@empoleon/core/Container';
