import { createSignal, createEffect, onCleanup } from 'solid-js';
import { useReducedMotion } from '../use-reduced-motion/use-reduced-motion';
import { useWindowEvent } from '../use-window-event/use-window-event';
import { easeInOutQuad } from './utils/ease-in-out-quad';
import { getRelativePosition } from './utils/get-relative-position';
import { getScrollStart } from './utils/get-scroll-start';
import { setScrollParam } from './utils/set-scroll-param';

interface ScrollIntoViewAnimation {
  /** Target element alignment relatively to parent based on current axis */
  alignment?: 'start' | 'end' | 'center';
}

interface ScrollIntoViewParams {
  /** Callback fired after scroll */
  onScrollFinish?: () => void;

  /** Duration of scroll in milliseconds */
  duration?: number;

  /** Axis of scroll */
  axis?: 'x' | 'y';

  /** Custom mathematical easing function */
  easing?: (t: number) => number;

  /** Additional distance between nearest edge and element */
  offset?: number;

  /** Indicator if animation may be interrupted by user scrolling */
  cancelable?: boolean;

  /** Prevents content jumping in scrolling lists with multiple targets */
  isList?: boolean;
}

interface ScrollIntoViewReturnType<
  Target extends HTMLElement = any,
  Parent extends HTMLElement | null = null,
> {
  scrollableRef: (el: Parent) => void;
  targetRef: (el: Target) => void;
  scrollIntoView: (params?: ScrollIntoViewAnimation) => void;
  cancel: () => void;
}

export function useScrollIntoView<
  Target extends HTMLElement = any,
  Parent extends HTMLElement | null = null,
>({
  duration = 1250,
  axis = 'y',
  onScrollFinish,
  easing = easeInOutQuad,
  offset = 0,
  cancelable = true,
  isList = false,
}: ScrollIntoViewParams = {}) {
  let frameID = 0;
  let startTime = 0;
  let shouldStop = false;

  const [scrollableElement, setScrollableElement] = createSignal<Parent | null>(null);
  const [targetElement, setTargetElement] = createSignal<Target | null>(null);

  const reducedMotion = useReducedMotion();

  const cancel = (): void => {
    if (frameID) {
      cancelAnimationFrame(frameID);
    }
  };

  const scrollIntoView = ({ alignment = 'start' }: ScrollIntoViewAnimation = {}) => {
    shouldStop = false;

    if (frameID) {
      cancel();
    }

    const start = getScrollStart({ parent: scrollableElement(), axis }) ?? 0;

    const change =
      getRelativePosition({
        parent: scrollableElement(),
        target: targetElement(),
        axis,
        alignment,
        offset,
        isList,
      }) - (scrollableElement() ? 0 : start);

    function animateScroll() {
      if (startTime === 0) {
        startTime = performance.now();
      }

      const now = performance.now();
      const elapsed = now - startTime;

      // Easing timing progress
      const t = reducedMotion() || duration === 0 ? 1 : elapsed / duration;

      const distance = start + change * easing(t);

      setScrollParam({
        parent: scrollableElement(),
        axis,
        distance,
      });

      if (!shouldStop && t < 1) {
        frameID = requestAnimationFrame(animateScroll);
      } else {
        typeof onScrollFinish === 'function' && onScrollFinish();
        startTime = 0;
        frameID = 0;
        cancel();
      }
    }
    animateScroll();
  };

  const handleStop = () => {
    if (cancelable) {
      shouldStop = true;
    }
  };

  /**
   * Detection of one of these events stops scroll animation
   * wheel - mouse wheel / touch pad
   * touchmove - any touchable device
   */

  useWindowEvent('wheel', handleStop, {
    passive: true,
  });

  useWindowEvent('touchmove', handleStop, {
    passive: true,
  });

  // Cleanup requestAnimationFrame
  onCleanup(() => cancel());

  return {
    scrollableRef: setScrollableElement,
    targetRef: setTargetElement,
    scrollIntoView,
    cancel,
  } as ScrollIntoViewReturnType<Target, Parent>;
}
