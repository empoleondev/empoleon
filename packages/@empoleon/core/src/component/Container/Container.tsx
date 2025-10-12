import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  EmpoleonSize,
  factory,
  Factory,
  getSize,
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

  /** Centering strategy @default `'block'` */
  strategy?: 'block' | 'grid';
}

export type ContainerFactory = Factory<{
  props: ContainerProps;
  ref: HTMLDivElement;
  stylesNames: ContainerStylesNames;
  vars: ContainerCssVariables;
}>;

const defaultProps: Partial<ContainerProps> = {};

const varsResolver = createVarsResolver<ContainerFactory>((_, props) => ({
  root: {
    '--container-size': props.fluid ? undefined : getSize(props.size, 'container-size'),
  },
}));

export const Container = factory<ContainerFactory>((_props) => {
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
    'attributes',
    'strategy',
    'ref',
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
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  return (
    <Box
      ref={local.ref}
      mod={[{ fluid: local.fluid, strategy: local.strategy || 'block' }, local.mod]}
      {...getStyles('root')}
      {...others}
    />
  );
});

Container.classes = classes;
Container.displayName = '@empoleon/core/Container';
