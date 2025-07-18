import { createSignal, onMount, onCleanup } from 'solid-js';

export function useTextSelection(): () => Selection | null {
  const [selection, setSelection] = createSignal<Selection | null>(null);

  const handleSelectionChange = () => {
    setSelection(document.getSelection());
  };

  onMount(() => {
    setSelection(document.getSelection());
    document.addEventListener('selectionchange', handleSelectionChange);

    onCleanup(() => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    });
  });

  return selection;
}
