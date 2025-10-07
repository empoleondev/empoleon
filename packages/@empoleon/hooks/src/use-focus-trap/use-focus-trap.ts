import { Accessor, createEffect, createSignal, onCleanup } from 'solid-js';
import { scopeTab } from './scope-tab';
import { FOCUS_SELECTOR } from './tabbable';

export function useFocusTrap(
  activeAccessor: Accessor<boolean> | boolean
): (instance: HTMLElement | null) => void {
  const [ref, setRef] = createSignal<HTMLElement | null>(null);

  const setRefCallback = (node: HTMLElement | null) => {
    setRef(node);
  };

  createEffect(() => {
    const isActive = typeof activeAccessor === 'function' ? activeAccessor() : activeAccessor;
    const element = ref();

    if (!isActive || !element) {
      return;
    }

    const timeoutId = setTimeout(() => {
      const autofocusElement = element.querySelector<HTMLElement>('[data-autofocus]');

      if (autofocusElement) {
        // If the autofocus element is a FocusTrap.InitialFocus, focus the next focusable element instead
        if (autofocusElement.classList.contains('empoleon-VisuallyHidden-root')) {
          const allFocusable = element.querySelectorAll<HTMLElement>(FOCUS_SELECTOR);
          const currentIndex = Array.from(allFocusable).indexOf(autofocusElement);
          const nextFocusable = allFocusable[currentIndex + 1];

          if (nextFocusable) {
            nextFocusable.focus();
          }
        } else {
          // Regular autofocus element - focus it directly
          autofocusElement.focus();
        }
      } else {
        // Fall back to the first focusable element
        const firstFocusable = element.querySelector<HTMLElement>(FOCUS_SELECTOR);
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        scopeTab(element, event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    onCleanup(() => {
      clearTimeout(timeoutId);
      document.removeEventListener('keydown', handleKeyDown);
    });
  });

  return setRefCallback;
}
