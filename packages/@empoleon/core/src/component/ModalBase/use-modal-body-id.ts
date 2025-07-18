import { createEffect } from 'solid-js';
import { useModalBaseContext } from './ModalBase.context';

export function useModalBodyId() {
  const ctx = useModalBaseContext();

  createEffect(() => {
    ctx.setBodyMounted(true);
    return () => ctx.setBodyMounted(false);
  });

  return ctx.getBodyId();
}
