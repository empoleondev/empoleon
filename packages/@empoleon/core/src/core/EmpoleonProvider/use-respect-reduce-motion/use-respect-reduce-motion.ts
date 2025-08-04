import { createEffect } from 'solid-js';

interface UseRespectReduceMotionOptions {
  respectReducedMotion: boolean;
  getRootElement: () => HTMLElement | undefined;
}

export function useRespectReduceMotion(props: UseRespectReduceMotionOptions) {
  createEffect(() => {
    if (props.respectReducedMotion) {
      props.getRootElement()?.setAttribute('data-respect-reduced-motion', 'true');
    }
  }, [props.respectReducedMotion]);
}
