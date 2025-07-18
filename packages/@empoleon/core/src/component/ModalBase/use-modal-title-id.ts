import { onMount, onCleanup } from 'solid-js';
import { useModalBaseContext } from './ModalBase.context';

export function useModalTitle() {
  const ctx = useModalBaseContext();

  onMount(() => {
    ctx.setTitleMounted(true);
  });

  onCleanup(() => {
    ctx.setTitleMounted(false);
  });

  return ctx.getTitleId();
}
