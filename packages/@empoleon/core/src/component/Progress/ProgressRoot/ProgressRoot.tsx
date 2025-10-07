import { createEffect, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  EmpoleonRadius,
  EmpoleonSize,
  factory,
  Factory,
  getRadius,
  getSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import { ProgressProvider } from '../Progress.context';
import classes from '../Progress.module.css';

export type ProgressRootStylesNames = 'root' | 'section' | 'label';
export type ProgressRootCssVariables = {
  root: '--progress-size' | '--progress-radius' | '--progress-transition-duration';
};

export interface __ProgressRootProps extends BoxProps, ElementProps<'div'> {
  /** Controls track height, `'md'` by default */
  size?: EmpoleonSize | (string & {}) | number;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Determines whether label text color should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;

  /** Controls sections width transition duration, value is specified in ms, `100` by default */
  transitionDuration?: number;
}

export interface ProgressRootProps
  extends __ProgressRootProps,
    StylesApiProps<ProgressRootFactory> {}

export type ProgressRootFactory = Factory<{
  props: ProgressRootProps;
  ref: HTMLDivElement;
  stylesNames: ProgressRootStylesNames;
  vars: ProgressRootCssVariables;
}>;

const defaultProps: Partial<ProgressRootProps> = {};

const varsResolver = createVarsResolver<ProgressRootFactory>((_, props) => ({
  root: {
    '--progress-size': getSize(props.size, 'progress-size'),
    '--progress-radius': props.radius === undefined ? undefined : getRadius(props.radius),
    '--progress-transition-duration':
      typeof props.transitionDuration === 'number' ? `${props.transitionDuration}ms` : undefined,
  },
}));

export const ProgressRoot = factory<ProgressRootFactory>((_props) => {
  const props = useProps('ProgressRoot', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'autoContrast',
    'transitionDuration',
    'attributes',
    'ref',
  ]);

  const getStyles = useStyles<ProgressRootFactory>({
    name: 'Progress',
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
    <ProgressProvider value={{ getStyles, autoContrast: local.autoContrast }}>
      <Box ref={local.ref} {...getStyles('root')} {...others} />
    </ProgressProvider>
  );
});

ProgressRoot.classes = classes;
ProgressRoot.displayName = '@empoleon/core/ProgressRoot';
