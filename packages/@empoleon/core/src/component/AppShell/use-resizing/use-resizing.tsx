import { createSignal, createEffect } from 'solid-js';
import { useWindowEvent } from '@empoleon/hooks';
import { isServer } from 'solid-js/web';

interface UseResizingInput {
  transitionDuration: number | undefined;
  disabled: boolean | undefined;
}

export function useResizing({ transitionDuration, disabled }: UseResizingInput) {
  const [resizing, setResizing] = createSignal(true);
  let resizingTimeout = -1;
  let disabledTimeout = -1;

  if (!isServer) {
    useWindowEvent('resize', () => {
      setResizing(true);
      clearTimeout(resizingTimeout);
      resizingTimeout = window.setTimeout(() => {
        setResizing(false);
      }, 200);
    });
  }

  createEffect(() => {
    if (disabled) {
      return;
    }

    setResizing(true);
    clearTimeout(disabledTimeout);
    disabledTimeout = window.setTimeout(() => {
      setResizing(false);
    }, transitionDuration || 0);
  });

  return resizing;
}
