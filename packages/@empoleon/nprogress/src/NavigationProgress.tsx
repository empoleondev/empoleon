import { createEffect, JSX, mergeProps, splitProps } from 'solid-js';
import {
  ElementProps,
  EmpoleonColor,
  getDefaultZIndex,
  OptionalPortal,
  PortalProps,
  Progress,
} from '@empoleon/core';
import {
  NprogressStore,
  nprogressStore,
  resetNavigationProgressAction,
  useNprogress,
} from './nprogress.store';
import classes from './NavigationProgress.module.css';

export interface NavigationProgressProps extends ElementProps<'div'> {
  /** Component store, controls state */
  store?: NprogressStore;

  /** Initial progress value, `0` by default */
  initialProgress?: number;

  /** Key of `theme.colors` of any other valid CSS color, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Controls height of the progress bar */
  size?: number;

  /** Step interval in ms, `500` by default */
  stepInterval?: number;

  /** Determines whether the progress bar should be rendered within `Portal`, `true` by default */
  withinPortal?: boolean;

  /** Props to pass down to the `Portal` when `withinPortal` is `true` */
  portalProps?: Omit<PortalProps, 'children' | 'withinPortal'>;

  /** Progressbar z-index, `9999` by default */
  zIndex?: JSX.CSSProperties['z-index'];
}

export function NavigationProgress(_props: NavigationProgressProps) {
  const props = mergeProps(
    {
      initialProgress: 0,
      size: 3,
      stepInterval: 500,
      withinPortal: true,
      zIndex: getDefaultZIndex('max'),
      store: nprogressStore,
    },
    _props
  );

  const [local, others] = splitProps(props, [
    'initialProgress',
    'color',
    'size',
    'stepInterval',
    'withinPortal',
    'portalProps',
    'zIndex',
    'store',
  ]);

  local.store.initialize({
    mounted: false,
    progress: local.initialProgress,
    interval: -1,
    step: 1,
    stepInterval: local.stepInterval,
    timeouts: [],
  });

  const state = useNprogress(local.store);

  createEffect(() => () => resetNavigationProgressAction(local.store), [local.store]);

  return (
    <OptionalPortal {...local.portalProps} withinPortal={local.withinPortal}>
      <Progress
        radius={0}
        value={state().progress}
        size={local.size}
        color={local.color}
        classNames={classes}
        data-mounted={state().mounted || undefined}
        __vars={{ '--nprogress-z-index': local.zIndex?.toString() }}
        {...others}
      />
    </OptionalPortal>
  );
}

NavigationProgress.displayName = '@empoleon/nprogress/NavigationProgress';
