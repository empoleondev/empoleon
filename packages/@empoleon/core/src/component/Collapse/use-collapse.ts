import { createSignal, createEffect, onCleanup, batch, splitProps } from 'solid-js';

export interface UseCollapseParams {
  opened: () => boolean;
  transitionDuration?: number;
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

  const transitionDuration = local.transitionDuration || 200;
  const transitionTimingFunction = local.transitionTimingFunction || 'ease';

  const [elementRef, setElementRef] = createSignal<HTMLDivElement>();
  const [isAnimating, setIsAnimating] = createSignal(false);

  let resizeObserver: ResizeObserver | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastKnownHeight = 0;

  // console.log('[useCollapse] Hook initialized');

  const measureContentHeight = (): number => {
    const element = elementRef();
    if (!element) return 0;

    const contentElement = element.querySelector('[data-collapse-content]') as HTMLElement;
    if (!contentElement) return 0;

    return contentElement.scrollHeight;
  };

  const updateHeight = (newHeight: number, immediate = false) => {
    if (Math.abs(newHeight - lastKnownHeight) <= 1) return; // Skip tiny changes

    // console.log(`[useCollapse] Height update: ${lastKnownHeight}px → ${newHeight}px ${immediate ? '(immediate)' : ''}`);

    batch(() => {
      lastKnownHeight = newHeight;

      const element = elementRef();
      if (element) {
        if (immediate) {
          // Disable transition temporarily for immediate updates
          const originalTransition = element.style.transition;
          element.style.transition = 'none';
          element.style.height = `${newHeight}px`;
          // Force reflow
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

    // console.log('[useCollapse] Setting up ResizeObserver');

    resizeObserver = new ResizeObserver((entries) => {
      if (isAnimating() || !local.opened()) return;

      // Only process entries that are DIRECT children of our content
      // This prevents sibling accordion changes from affecting us
      for (const entry of entries) {
        const target = entry.target as HTMLElement;

        // ONLY handle our direct content element
        if (target === contentElement) {
          // console.log('[useCollapse] Direct content element resized');
          const newHeight = measureContentHeight();
          updateHeight(newHeight);
          break; // Only process the first relevant entry
        }

        // ONLY handle direct accordion children (not nested ones from siblings)
        else if (target.parentElement === contentElement &&
                 target.getAttribute('role') === 'region') {
          // console.log('[useCollapse] Direct child accordion resized');
          const newHeight = measureContentHeight();
          updateHeight(newHeight);
          break;
        }
      }
    });

    // ONLY observe the direct content element
    resizeObserver.observe(contentElement);

    // Find and observe ONLY direct children that are accordion panels
    const directChildren = Array.from(contentElement.children);
    directChildren.forEach(child => {
      // Only observe if it's a direct accordion panel child
      if (child.getAttribute('role') === 'region') {
        // console.log('[useCollapse] Observing direct child accordion panel');
        resizeObserver!.observe(child);
      }
    });

    // console.log(`[useCollapse] Observing ${1 + directChildren.filter(c => c.getAttribute('role') === 'region').length} elements`);
  };

  const cleanupObserver = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = undefined;
      // console.log('[useCollapse] ResizeObserver cleaned up');
    }
  };

  // Handle open/close state changes
  createEffect(() => {
    const element = elementRef();
    const isOpened = local.opened();

    // console.log(`[useCollapse] State change - opened: ${isOpened}, element: ${!!element}`);

    if (!element) return;

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }

    batch(() => {
      setIsAnimating(true);

      if (isOpened) {
        // Opening: measure and animate to target height
        const targetHeight = measureContentHeight();
        lastKnownHeight = targetHeight;
        element.style.height = `${targetHeight}px`;

        // console.log(`[useCollapse] Opening to height: ${targetHeight}px`);

        // Setup observer after a short delay to avoid initial transition conflicts
        setTimeout(() => {
          if (local.opened() && !isAnimating()) {
            setupResizeObserver();
          }
        }, transitionDuration + 50);
      } else {
        // Closing: cleanup and animate to 0
        cleanupObserver();
        element.style.height = '0px';
        // console.log('[useCollapse] Closing accordion');
      }

      // Mark animation as complete after duration
      const animationTimeout = setTimeout(() => {
        setIsAnimating(false);
        // console.log('[useCollapse] Animation completed');
        local.onTransitionEnd?.();
      }, transitionDuration + 20);

      timeoutId = animationTimeout;
    });
  });

  onCleanup(() => {
    // console.log('[useCollapse] Cleaning up');
    cleanupObserver();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return () => ({
    ref: (el: HTMLDivElement) => {
      if (!el || elementRef() === el) return;

      // console.log('[useCollapse] Ref callback called');
      setElementRef(el);

      // Setup base styles
      el.style.overflow = 'hidden';
      el.style.transition = `height ${transitionDuration}ms ${transitionTimingFunction}`;

      // Set initial height
      if (local.opened()) {
        setTimeout(() => {
          const initialHeight = measureContentHeight();
          lastKnownHeight = initialHeight;
          el.style.height = `${initialHeight}px`;
          // console.log(`[useCollapse] Initial height set to ${initialHeight}px (open)`);

          // Setup observer immediately for initially open panels
          setTimeout(() => setupResizeObserver(), 100);
        }, 0);
      } else {
        el.style.height = '0px';
        lastKnownHeight = 0;
        // console.log('[useCollapse] Initial height set to 0px (closed)');
      }
    },
    style: {
      overflow: 'hidden',
      transition: `height ${transitionDuration}ms ${transitionTimingFunction}`,
    },
    onTransitionEnd: (e: TransitionEvent) => {
      const element = elementRef();
      // Only handle our own height transitions
      if (e.target === element && e.propertyName === 'height') {
        // console.log('[useCollapse] DOM transition ended');
        setIsAnimating(false);

        // If we just opened, setup the observer now that animation is done
        if (local.opened() && !resizeObserver) {
          setupResizeObserver();
        }
      }
    }
  });
}
