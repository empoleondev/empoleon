import { createSignal, onMount, onCleanup } from 'solid-js';

export function useHover<T extends HTMLElement = any>() {
  const [hovered, setHovered] = createSignal(false);
  let ref: T | undefined;

  const onMouseEnter = () => setHovered(true);
  const onMouseLeave = () => setHovered(false);

  onMount(() => {
    const node = ref;

    if (node) {
      node.addEventListener('mouseenter', onMouseEnter);
      node.addEventListener('mouseleave', onMouseLeave);

      onCleanup(() => {
        node?.removeEventListener('mouseenter', onMouseEnter);
        node?.removeEventListener('mouseleave', onMouseLeave);
      });
    }
  });

  return { ref: (el: T) => (ref = el), hovered };
}
