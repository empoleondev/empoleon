import { createEffect, createSignal, startTransition } from 'solid-js';
import { isServer } from 'solid-js/web';
import { useWindowEvent } from '@empoleon/hooks';

interface UseResizingInput {
  transitionDuration: number | undefined;
  disabled: boolean | undefined;
}

export function useResizing(props: UseResizingInput) {
  const [resizing, setResizing] = createSignal(true);
  let resizingTimeout = -1;
  let disabledTimeout = -1;

  if (!isServer) {
    useWindowEvent('resize', () => {
      setResizing(true);
      clearTimeout(resizingTimeout);
      resizingTimeout = window.setTimeout(
        () =>
          startTransition(() => {
            setResizing(false);
          }),
        200
      );
    });
  }

  createEffect(() => {
    // Track both disabled and transitionDuration
    props.disabled;
    props.transitionDuration;

    setResizing(true);
    clearTimeout(disabledTimeout);
    disabledTimeout = window.setTimeout(
      () =>
        startTransition(() => {
          setResizing(false);
        }),
      props.transitionDuration || 0
    );
  });

  return resizing;
}
