import { createSignal, createEffect, onCleanup, batch, splitProps } from 'solid-js';

export interface UseCollapseParams {
  opened: () => boolean;
  transitionDuration?: () => number;
  transitionTimingFunction?: string;
  onTransitionEnd?: () => void;
  keepMounted?: boolean;
}

export function useCollapse(props: UseCollapseParams) {
  const [local] = splitProps(props, [
    'opened',
    'transitionDuration',
    'transitionTimingFunction',
    'onTransitionEnd',
    'keepMounted'
  ]);

  const transitionDuration = () => (local.transitionDuration?.() || 0);
  const transitionTimingFunction = local.transitionTimingFunction || 'ease';

  const [elementRef, setElementRef] = createSignal<HTMLDivElement>();
  const [isAnimating, setIsAnimating] = createSignal(false);

  let resizeObserver: ResizeObserver | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastKnownHeight = 0;

  const measureContentHeight = (): number => {
    const element = elementRef();
    if (!element) return 0;

    const contentElement = element.querySelector('[data-collapse-content]') as HTMLElement;
    if (!contentElement) return 0;

    return contentElement.scrollHeight;
  };

  const updateHeight = (newHeight: number, immediate = false) => {
    if (Math.abs(newHeight - lastKnownHeight) <= 1) return;

    batch(() => {
      lastKnownHeight = newHeight;

      const element = elementRef();
      if (element) {
        if (immediate) {
          const originalTransition = element.style.transition;
          element.style.transition = 'none';
          element.style.height = `${newHeight}px`;
          element.offsetHeight;
          element.style.transition = originalTransition;
        } else {
          element.style.height = `${newHeight}px`;
        }
      }
    });
  };

  const setupResizeObserver = () => {
    const element = elementRef();
    if (!element || resizeObserver) return;

    const contentElement = element.querySelector('[data-collapse-content]');
    if (!contentElement) return;

    resizeObserver = new ResizeObserver((entries) => {
      if (isAnimating() || !local.opened()) return;

      for (const entry of entries) {
        const target = entry.target as HTMLElement;

        if (target === contentElement) {
          const newHeight = measureContentHeight();
          updateHeight(newHeight);
          break;
        }

        else if (target.parentElement === contentElement &&
                 target.getAttribute('role') === 'region') {
          const newHeight = measureContentHeight();
          updateHeight(newHeight);
          break;
        }
      }
    });

    resizeObserver.observe(contentElement);

    const directChildren = Array.from(contentElement.children);
    directChildren.forEach(child => {
      if (child.getAttribute('role') === 'region') {
        resizeObserver!.observe(child);
      }
    });
  };

  const cleanupObserver = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = undefined;
    }
  };

  createEffect(() => {
    const element = elementRef();
    const isOpened = local.opened();

    if (!element) return;

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }

    batch(() => {
      setIsAnimating(true);

      if (isOpened) {
        const targetHeight = measureContentHeight();
        lastKnownHeight = targetHeight;

        // If no content height, use auto to allow external height props
        if (targetHeight > 0) {
          element.style.height = `${targetHeight}px`;
        }

        setTimeout(() => {
          if (local.opened() && !isAnimating()) {
            setupResizeObserver();
          }
        }, transitionDuration() + 50);
      } else {
        cleanupObserver();

        const inlineHeight = element.style.height;

        if (!inlineHeight || inlineHeight === 'auto' || inlineHeight.endsWith('px')) {
          element.style.height = '0px';
        }
      }

      const animationTimeout = setTimeout(() => {
        setIsAnimating(false);
        local.onTransitionEnd?.();
      }, transitionDuration() + 20);

      timeoutId = animationTimeout;
    });
  });

  onCleanup(() => {
    cleanupObserver();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return () => ({
    ref: (el: HTMLDivElement) => {
      if (!el || elementRef() === el) return;

      setElementRef(el);

      el.style.overflow = 'hidden';
      el.style.transition = `height ${transitionDuration()}ms ${transitionTimingFunction}`;

      if (local.opened()) {
        setTimeout(() => {
          const initialHeight = measureContentHeight();
          lastKnownHeight = initialHeight;

          // If no content, use auto to allow external height props
          if (initialHeight > 0) {
            el.style.height = `${initialHeight}px`;
          }

          setTimeout(() => setupResizeObserver(), 100);
        }, 0);
      } else {
        el.style.height = '0px';
        lastKnownHeight = 0;
      }
    },
    style: {
      overflow: 'hidden',
      transition: `height ${transitionDuration()}ms ${transitionTimingFunction}`,
    },
    onTransitionEnd: (e: TransitionEvent) => {
      const element = elementRef();
      if (e.target === element && e.propertyName === 'height') {
        setIsAnimating(false);

        if (local.opened() && !resizeObserver) {
          setupResizeObserver();
        }
      }
    }
  });
}
