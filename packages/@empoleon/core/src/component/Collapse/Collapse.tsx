import { createMemo, JSX, splitProps } from 'solid-js';
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

  /** Keep element in DOM when collapsed, useful for nested collapses */
  keepMounted?: boolean;
}

export type CollapseFactory = Factory<{
  props: CollapseProps;
  ref: HTMLDivElement;
}>;

const defaultProps = {
  transitionDuration: 200,
  transitionTimingFunction: 'ease',
  animateOpacity: true,
} satisfies Partial<CollapseProps>;

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
    'keepMounted',
    'ref',
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
    keepMounted: local.keepMounted,
  });

  // If animations are disabled, render directly
  if (duration === 0) {
    return opened() ? <Box {...others}>{local.children}</Box> : null;
  }

  const collapseProps = createMemo(() => getCollapseProps());

  return (
    <Box
      {...collapseProps()}
      {...others}
      style={{
        ...(collapseProps().style as Record<string, any>),
        ...getStyleObject(local.style, theme),
      }}
      ref={useMergedRef(collapseProps().ref, local.ref)}
    >
      <div
        data-collapse-content
        style={{
          transition: local.animateOpacity
            ? `opacity ${duration}ms ${local.transitionTimingFunction || 'ease'}`
            : undefined,
          opacity: local.animateOpacity ? (opened() ? 1 : 0) : 1,
        }}
      >
        {local.children}
      </div>
    </Box>
  );
});

Collapse.displayName = '@empoleon/core/Collapse';
