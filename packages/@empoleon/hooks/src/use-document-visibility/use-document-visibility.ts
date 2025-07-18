import { createSignal, onMount, onCleanup } from 'solid-js';

export function useDocumentVisibility(): () => DocumentVisibilityState {
  const [documentVisibility, setDocumentVisibility] = createSignal<DocumentVisibilityState>('visible');

  onMount(() => {
    const listener = () => setDocumentVisibility(document.visibilityState);
    document.addEventListener('visibilitychange', listener);
    onCleanup(() => document.removeEventListener('visibilitychange', listener));
  });

  return documentVisibility;
}
