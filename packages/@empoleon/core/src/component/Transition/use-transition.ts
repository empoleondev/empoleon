import { createSignal, createEffect, onCleanup, splitProps, mergeProps } from 'solid-js';
import { useReducedMotion } from '@empoleon/hooks';
import { useEmpoleonTheme } from '../../core';

export type TransitionStatus =
  | 'entered'
  | 'exited'
  | 'entering'
  | 'exiting'
  | 'pre-exiting'
  | 'pre-entering';

interface UseTransition {
  duration: number;
  exitDuration: number;
  timingFunction: string;
  mounted: () => boolean;
  onEnter?: () => void;
  onExit?: () => void;
  onEntered?: () => void;
  onExited?: () => void;
  enterDelay?: number;
  exitDelay?: number;
}

export function useTransition(props: UseTransition) {
  const [local] = splitProps(props, [
    'duration',
    'exitDuration',
    'timingFunction',
    'mounted',
    'onEnter',
    'onExit',
    'onEntered',
    'onExited',
    'enterDelay',
    'exitDelay'
  ]);

  const theme = useEmpoleonTheme();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const [transitionDuration, setTransitionDuration] = createSignal(reduceMotion ? 0 : local.duration);
  const [transitionStatus, setStatus] = createSignal<TransitionStatus>(local.mounted() ? 'entered' : 'exited');
  let transitionTimeoutRef = -1;
  let delayTimeoutRef = -1;
  let rafRef = -1;

  const handleStateChange = (shouldMount: boolean) => {
    const preHandler = shouldMount ? local.onEnter : local.onExit;
    const handler = shouldMount ? local.onEntered : local.onExited;

    window.clearTimeout(transitionTimeoutRef);

    const newTransitionDuration = reduceMotion ? 0 : shouldMount ? local.duration : local.exitDuration;
    setTransitionDuration(newTransitionDuration);

    if (newTransitionDuration === 0) {
      typeof preHandler === 'function' && preHandler();
      typeof handler === 'function' && handler();
      setStatus(shouldMount ? 'entered' : 'exited');
    } else {
      // Make sure new status won't be set within the same frame as this would disrupt animation #3126
      rafRef = requestAnimationFrame(() => {
        setStatus(shouldMount ? 'pre-entering' : 'pre-exiting');

        rafRef = requestAnimationFrame(() => {
          typeof preHandler === 'function' && preHandler();
          setStatus(shouldMount ? 'entering' : 'exiting');

          transitionTimeoutRef = window.setTimeout(() => {
            typeof handler === 'function' && handler();
            setStatus(shouldMount ? 'entered' : 'exited');
          }, newTransitionDuration);
        });
      });
    }
  };

  const handleTransitionWithDelay = (shouldMount: boolean) => {
    window.clearTimeout(delayTimeoutRef);
    const delay = shouldMount ? local.enterDelay : local.exitDelay;

    if (typeof delay !== 'number') {
      handleStateChange(shouldMount);
      return;
    }

    delayTimeoutRef = window.setTimeout(
      () => {
        handleStateChange(shouldMount);
      },
      shouldMount ? local.enterDelay : local.exitDelay
    );
  };

  let isFirstRun = true;
  createEffect(() => {
    const isMounted = local.mounted();

    if (isFirstRun) {
      isFirstRun = false;
      return;
    }

    handleTransitionWithDelay(isMounted);
  });

  onCleanup(() => {
    window.clearTimeout(transitionTimeoutRef);
    cancelAnimationFrame(rafRef);
  });

  return mergeProps({
    transitionDuration,
    transitionStatus,
    transitionTimingFunction: local.timingFunction || 'ease',
  });
}
