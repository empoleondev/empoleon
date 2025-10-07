import { createEffect, createSignal } from 'solid-js';
import { useReducedMotion } from '@empoleon/hooks';

interface UseScrollLock {
  opened: () => boolean;
  transitionDuration: number;
}

export function useLockScroll({ opened, transitionDuration }: UseScrollLock) {
  const [shouldLockScroll, setShouldLockScroll] = createSignal(opened());
  let timeout: number = -1;
  const reduceMotion = useReducedMotion();
  const _transitionDuration = reduceMotion() ? 0 : transitionDuration;

  createEffect(() => {
    if (opened()) {
      setShouldLockScroll(true);
      window.clearTimeout(timeout);
    } else if (_transitionDuration === 0) {
      setShouldLockScroll(false);
    } else {
      timeout = window.setTimeout(() => setShouldLockScroll(false), _transitionDuration);
    }

    return () => window.clearTimeout(timeout);
  });

  return shouldLockScroll;
}
