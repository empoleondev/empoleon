import { onCleanup } from 'solid-js';

export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLElement,
>(
  type: K,
  listener: (this: T, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) {
  return (el: T) => {
    el.addEventListener(type, listener as any, options);
    onCleanup(() => el.removeEventListener(type, listener as any, options));
  };
}
