import { createEffect } from 'solid-js';

interface UseRespectReduceMotionOptions {
  respectReducedMotion: boolean;
  getRootElement: () => HTMLElement | undefined;
}

export function useRespectReduceMotion({
  respectReducedMotion,
  getRootElement,
}: UseRespectReduceMotionOptions) {
  createEffect(() => {
    if (respectReducedMotion) {
      getRootElement()?.setAttribute('data-respect-reduced-motion', 'true');
    }
  }, [respectReducedMotion]);
}
