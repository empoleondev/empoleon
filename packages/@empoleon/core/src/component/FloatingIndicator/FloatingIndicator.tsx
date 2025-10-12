import { createSignal, Show, splitProps } from 'solid-js';
import { useMergedRef } from '@empoleon/hooks';
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
import { useFloatingIndicator } from './use-floating-indicator';
import classes from './FloatingIndicator.module.css';

export type FloatingIndicatorStylesNames = 'root';
export type FloatingIndicatorCssVariables = {
  root: '--transition-duration';
};

export interface FloatingIndicatorProps
  extends BoxProps,
    StylesApiProps<FloatingIndicatorFactory>,
    ElementProps<'div'> {
  /** Target element over which indicator should be displayed */
  target: HTMLElement | null | undefined;

  /** Parent element with relative position based on which indicator position should be calculated */
  parent: HTMLElement | null | undefined;

  /** Transition duration in ms, `150` by default */
  transitionDuration?: number | string;

  /** Determines whether indicator should be displayed after transition ends, should be set if used inside a container that has `transform: scale(n)` styles */
  displayAfterTransitionEnd?: boolean;
}

export type FloatingIndicatorFactory = Factory<{
  props: FloatingIndicatorProps;
  ref: HTMLDivElement;
  stylesNames: FloatingIndicatorStylesNames;
  vars: FloatingIndicatorCssVariables;
}>;

const defaultProps: Partial<FloatingIndicatorProps> = {};

const varsResolver = createVarsResolver<FloatingIndicatorFactory>((_theme, props) => ({
  root: {
    '--transition-duration':
      typeof props.transitionDuration === 'number'
        ? `${props.transitionDuration}ms`
        : props.transitionDuration,
  },
}));

export const FloatingIndicator = factory<FloatingIndicatorFactory>((_props) => {
  const props = useProps('FloatingIndicator', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'target',
    'parent',
    'transitionDuration',
    'mod',
    'displayAfterTransitionEnd',
    'attributes',
    'ref',
  ]);

  const getStyles = useStyles<FloatingIndicatorFactory>({
    name: 'FloatingIndicator',
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

  const [innerRef, setInnerRef] = createSignal<HTMLDivElement | undefined>(undefined);
  const { initialized, hidden } = useFloatingIndicator({
    target: () => local.target,
    parent: () => local.parent,
    ref: () => innerRef()!,
    displayAfterTransitionEnd: local.displayAfterTransitionEnd,
  });

  const mergedRef = useMergedRef(local.ref, setInnerRef);

  return (
    <Show when={local.target && local.parent} fallback={null}>
      <Box
        ref={mergedRef}
        mod={[{ initialized, hidden }, local.mod]}
        {...getStyles('root')}
        {...others}
      />
    </Show>
  );
});

FloatingIndicator.displayName = '@empoleon/core/FloatingIndicator';
FloatingIndicator.classes = classes;
