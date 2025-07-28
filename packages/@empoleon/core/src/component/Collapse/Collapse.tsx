import { createEffect, createMemo, JSX, splitProps } from 'solid-js';
import { useMergedRef, useReducedMotion } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  Factory,
  factory,
  getStyleObject,
  useEmpoleonTheme,
  useProps,
} from '../../core';
import { useCollapse } from './use-collapse';

export interface CollapseProps
  extends BoxProps,
    Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof BoxProps> {
  /** Opened state */
  in: boolean;

  /** Called each time transition ends */
  onTransitionEnd?: () => void;

  /** Transition duration in ms, `200` by default */
  transitionDuration?: number;

  /** Transition timing function, default value is `ease` */
  transitionTimingFunction?: string;

  /** Determines whether opacity should be animated, `true` by default */
  animateOpacity?: boolean;
}

export type CollapseFactory = Factory<{
  props: CollapseProps;
  ref: HTMLDivElement;
}>;

const defaultProps: Partial<CollapseProps> = {
  transitionDuration: 200,
  transitionTimingFunction: 'ease',
  animateOpacity: true,
};

export const Collapse = factory<CollapseFactory>(_props => {
  const props = useProps('Collapse', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'in',
    'transitionDuration',
    'transitionTimingFunction',
    'style',
    'onTransitionEnd',
    'animateOpacity',
    'ref'
  ]);

  const opened = () => local.in;
  const theme = useEmpoleonTheme();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const duration = reduceMotion ? 0 : local.transitionDuration;

  const getCollapseProps = useCollapse({
    opened,
    transitionDuration: duration,
    transitionTimingFunction: local.transitionTimingFunction,
    onTransitionEnd: local.onTransitionEnd,
  });

  if (duration === 0) {
    return opened() ? <Box {...others}>{local.children}</Box> : null;
  }

  const collapseProps = createMemo(() => getCollapseProps());
  const mergedRef = useMergedRef(collapseProps().ref, local.ref);

  return (
    <Box
      {...collapseProps}
      {...others}
      style={{
        ...(collapseProps().style as Record<string, any>),
        ...getStyleObject(local.style, theme),
      }}
      ref={mergedRef}
    >
      <div
        style={{
          transition: `opacity ${duration}ms ${local.transitionTimingFunction || 'ease'}`,
          opacity: opened() ? 1 : 0,
        }}
      >
        {local.children}
      </div>
    </Box>
  );
});

Collapse.displayName = '@empoleon/core/Collapse';
