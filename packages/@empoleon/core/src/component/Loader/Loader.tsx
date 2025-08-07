import { JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  factory,
  Factory,
  getSize,
  getThemeColor,
  EmpoleonColor,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import type { EmpoleonLoader, EmpoleonLoadersRecord } from './Loader.types';
import { Bars } from './loaders/Bars';
import { Dots } from './loaders/Dots';
import { Oval } from './loaders/Oval';
import classes from './Loader.module.css';

export type LoaderStylesNames = 'root';
export type LoaderCssVariables = {
  root: '--loader-size' | '--loader-color';
};

export interface LoaderProps
  extends BoxProps,
    StylesApiProps<LoaderFactory>,
    Omit<JSX.SvgSVGAttributes<SVGSVGElement>, 'ref' | keyof BoxProps> {
  /** Controls `width` and `height` of the loader. `Loader` has predefined `xs`-`xl` values. Numbers are converted to rem. Default value is `'md'` */
  size?: EmpoleonSize | (string & {}) | number;

  /** Key of `theme.colors` or any valid CSS color, default value is `theme.primaryColor`  */
  color?: EmpoleonColor;

  /** Loader type, key of `loaders` prop, default value is `'oval'` */
  type?: EmpoleonLoader;

  /** Object of loaders components, can be customized via default props or inline. Default value contains `bars`, `oval` and `dots` */
  loaders?: EmpoleonLoadersRecord;

  /** Overrides default loader with given content */
  children?: JSX.Element;

  /** Reference to the loader element */
  ref?: HTMLSpanElement;
}

export type LoaderFactory = Factory<{
  props: LoaderProps;
  ref: HTMLSpanElement | SVGSVGElement;
  stylesNames: LoaderStylesNames;
  vars: LoaderCssVariables;
  staticComponents: {
    defaultLoaders: typeof defaultLoaders;
  };
}>;

export const defaultLoaders: EmpoleonLoadersRecord = {
  bars: Bars,
  oval: Oval,
  dots: Dots,
};

const defaultProps = {
  loaders: defaultLoaders,
  type: 'oval',
} satisfies Partial<LoaderProps>;

const varsResolver = createVarsResolver<LoaderFactory>((theme, { size, color }) => ({
  root: {
    '--loader-size': getSize(size, 'loader-size'),
    '--loader-color': color ? getThemeColor(color, theme) : undefined,
  },
}));

export const Loader = factory<LoaderFactory>(_props => {
  const props = useProps('Loader', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'size',
    'color',
    'type',
    'vars',
    'className',
    'style',
    'classNames',
    'styles',
    'unstyled',
    'loaders',
    'variant',
    'children',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<LoaderFactory>({
    name: 'Loader',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  if (local.children) {
    return (
      <Box {...getStyles('root')} ref={local.ref} {...(others as any)}>
        {local.children}
      </Box>
    );
  }

  return (
    <Box
      {...getStyles('root')}
      ref={local.ref}
      component={(local.loaders as any)[local.type!]}
      variant={local.variant}
      size={local.size}
      {...others}
    />
  );
});

Loader.defaultLoaders = defaultLoaders;
Loader.classes = classes;
Loader.displayName = '@empoleon/core/Loader';
