import { createEffect, onCleanup } from 'solid-js';

interface UseFocusReturnParams {
  opened: () => boolean;
  shouldReturnFocus?: () => boolean;
}

/**
 * Returns a callback that, when invoked, will return focus to the last active element.
 * Internally, it tracks `opened` going from true→false (after the first “mount”)
 * and, if `shouldReturnFocus` is true, schedules focus return.
 */
export function useFocusReturn(
  params: UseFocusReturnParams
): () => void {
  let lastActiveElement: HTMLElement | null = null;
  let isFirstRun = true;

  const returnFocus = () => {
    if (
      lastActiveElement &&
      typeof lastActiveElement.focus === 'function'
    ) {
      lastActiveElement.focus({ preventScroll: true });
    }
  };

  createEffect(() => {
    const opened = params.opened();
    const shouldReturn =
      typeof params.shouldReturnFocus === 'function'
        ? params.shouldReturnFocus()
        : true;

    // Skip on initial mount
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }

    let timeoutId: number = -1;
    const clearFocusTimeout = (ev: KeyboardEvent) => {
      if (ev.key === 'Tab') {
        window.clearTimeout(timeoutId);
      }
    };

    document.addEventListener('keydown', clearFocusTimeout);

    if (opened) {
      // If the modal/drawer just opened, stash the currently focused element
      lastActiveElement = document.activeElement as HTMLElement;
    } else if (shouldReturn) {
      // If it just closed (and we want to return focus), wait a tick then return
      timeoutId = window.setTimeout(returnFocus, 10);
    }

    onCleanup(() => {
      window.clearTimeout(timeoutId);
      document.removeEventListener('keydown', clearFocusTimeout);
    });
  });

  return returnFocus;
}
