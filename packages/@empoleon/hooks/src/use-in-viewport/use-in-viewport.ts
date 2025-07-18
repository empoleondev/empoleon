import { createSignal, onCleanup } from 'solid-js';

export function useInViewport<T extends HTMLElement = any>() {
  let observer: IntersectionObserver | null = null;
  const [inViewport, setInViewport] = createSignal(false);

  const ref = (node: T | null) => {
    if (typeof IntersectionObserver !== 'undefined') {
      if (node && !observer) {
        observer = new IntersectionObserver((entries) =>
          setInViewport(entries.some((entry) => entry.isIntersecting))
        );
      } else {
        observer?.disconnect();
      }

      if (node) {
        observer?.observe(node);
      } else {
        setInViewport(false);
      }
    }
  };

  onCleanup(() => {
    observer?.disconnect();
  });

  return { ref, inViewport };
}
