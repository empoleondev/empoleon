import { createSignal, createEffect, onMount, onCleanup } from 'solid-js';
import { useWindowScroll } from '../use-window-scroll/use-window-scroll';

export const isFixed = (current: number, fixedAt: number) => current <= fixedAt;
export const isPinned = (current: number, previous: number) => current <= previous;
export const isReleased = (current: number, previous: number, fixedAt: number) =>
  !isPinned(current, previous) && !isFixed(current, fixedAt);

export const isPinnedOrReleased = (
  current: number,
  fixedAt: number,
  isCurrentlyPinned: () => boolean,
  setIsCurrentlyPinned: (value: boolean) => void,
  isScrollingUp: boolean,
  onPin?: () => void,
  onRelease?: () => void
) => {
  const isInFixedPosition = isFixed(current, fixedAt);
  if (isInFixedPosition && !isCurrentlyPinned()) {
    setIsCurrentlyPinned(true);
    onPin?.();
  } else if (!isInFixedPosition && isScrollingUp && !isCurrentlyPinned()) {
    setIsCurrentlyPinned(true);
    onPin?.();
  } else if (!isInFixedPosition && isCurrentlyPinned()) {
    setIsCurrentlyPinned(false);
    onRelease?.();
  }
};

export const useScrollDirection = () => {
  const [lastScrollTop, setLastScrollTop] = createSignal(0);
  const [isScrollingUp, setIsScrollingUp] = createSignal(false);
  const [isResizing, setIsResizing] = createSignal(false);

  let resizeTimer: ReturnType<typeof setTimeout> | undefined;

  const onResize = () => {
    setIsResizing(true);
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setIsResizing(false);
    }, 300);
  };

  const onScroll = () => {
    if (isResizing()) {
      return;
    }
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsScrollingUp(currentScrollTop < lastScrollTop());
    setLastScrollTop(currentScrollTop);
  };

  onMount(() => {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
  });

  onCleanup(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    clearTimeout(resizeTimer);
  });

  return isScrollingUp;
};

interface UseHeadroomInput {
  /** Number in px at which element should be fixed */
  fixedAt?: number;

  /** Called when element is pinned */
  onPin?: () => void;

  /** Called when element is at fixed position */
  onFix?: () => void;

  /** Called when element is unpinned */
  onRelease?: () => void;
}

export function useHeadroom({ fixedAt = 0, onPin, onFix, onRelease }: UseHeadroomInput = {}) {
  const [isCurrentlyPinned, setIsCurrentlyPinned] = createSignal(false);
  const isScrollingUp = useScrollDirection();
  const [position] = useWindowScroll();

  createEffect(() => {
    const scrollPosition = position().y;
    isPinnedOrReleased(
      scrollPosition,
      fixedAt,
      isCurrentlyPinned,
      setIsCurrentlyPinned,
      isScrollingUp(),
      onPin,
      onRelease
    );
  });

  createEffect(() => {
    const scrollPosition = position().y;
    if (isFixed(scrollPosition, fixedAt)) {
      onFix?.();
    }
  });

  const shouldShow = () => {
    const scrollPosition = position().y;
    return isFixed(scrollPosition, fixedAt) || isScrollingUp();
  };

  return shouldShow;
}
