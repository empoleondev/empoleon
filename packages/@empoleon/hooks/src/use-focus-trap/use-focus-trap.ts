import { createEffect, createSignal, onCleanup, Accessor } from 'solid-js';
import { scopeTab } from './scope-tab';
import { FOCUS_SELECTOR } from './tabbable';

export function useFocusTrap(activeAccessor: Accessor<boolean> | boolean): (instance: HTMLElement | null) => void {
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
      const firstFocusable = element.querySelector<HTMLElement>(FOCUS_SELECTOR);
      if (firstFocusable) {
        firstFocusable.focus();
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
