import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './AspectRatio.module.css';

export type AspectRatioStylesNames = 'root';
export type AspectRatioCssVariables = {
  root: '--ar-ratio';
};

export interface AspectRatioProps
  extends BoxProps,
    StylesApiProps<AspectRatioFactory>,
    ElementProps<'div'> {
  /** Aspect ratio, e.g. `16 / 9`, `4 / 3`, `1920 / 1080`, `1` by default */
  ratio?: number;
}

export type AspectRatioFactory = Factory<{
  props: AspectRatioProps;
  ref: HTMLDivElement;
  stylesNames: AspectRatioStylesNames;
  vars: AspectRatioCssVariables;
}>;

const varsResolver = createVarsResolver<AspectRatioFactory>((_, { ratio }) => ({
  root: {
    '--ar-ratio': ratio?.toString(),
  },
}));

export const AspectRatio = factory<AspectRatioFactory>(_props => {
  const props = useProps('AspectRatio', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'ratio',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<AspectRatioFactory>({
    name: 'AspectRatio',
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

  return <Box ref={local.ref} {...getStyles('root')} {...others} />;
});

AspectRatio.classes = classes;
AspectRatio.displayName = '@empoleon/core/AspectRatio';
