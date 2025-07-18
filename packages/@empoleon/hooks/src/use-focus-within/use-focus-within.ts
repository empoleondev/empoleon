import { createSignal, onCleanup, onMount } from 'solid-js';

export interface UseFocusWithinOptions {
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

function containsRelatedTarget(event: FocusEvent) {
  if (event.currentTarget instanceof HTMLElement && event.relatedTarget instanceof HTMLElement) {
    return event.currentTarget.contains(event.relatedTarget);
  }

  return false;
}

export function useFocusWithin<T extends HTMLElement = any>({
  onBlur,
  onFocus,
}: UseFocusWithinOptions = {}): { ref: (el: T) => void; focused: () => boolean } {
  let ref: T | undefined;
  const [focused, setFocused] = createSignal(false);
  let focusedRef = false;

  const _setFocused = (value: boolean) => {
    setFocused(value);
    focusedRef = value;
  };

  const handleFocusIn = (event: FocusEvent) => {
    if (!focusedRef) {
      _setFocused(true);
      onFocus?.(event);
    }
  };

  const handleFocusOut = (event: FocusEvent) => {
    if (focusedRef && !containsRelatedTarget(event)) {
      _setFocused(false);
      onBlur?.(event);
    }
  };

  onMount(() => {
    if (ref) {
      ref.addEventListener('focusin', handleFocusIn);
      ref.addEventListener('focusout', handleFocusOut);

      onCleanup(() => {
        ref?.removeEventListener('focusin', handleFocusIn);
        ref?.removeEventListener('focusout', handleFocusOut);
      });
    }
  });

  const setRef = (el: T) => {
    ref = el;
  };

  return { ref: setRef, focused };
}
