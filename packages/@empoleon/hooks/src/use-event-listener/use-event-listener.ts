import { onMount, onCleanup } from 'solid-js';

export function useEventListener<K extends keyof HTMLElementEventMap>(
  type: K,
  listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) {
  let ref: HTMLDivElement | undefined;

  onMount(() => {
    const node = ref;

    if (node) {
      node.addEventListener(type, listener as any, options);
      onCleanup(() => node?.removeEventListener(type, listener as any, options));
    }
  });

  return ref;
}
