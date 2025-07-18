import { createSignal, onCleanup } from 'solid-js';

export function useIntersection<T extends HTMLElement = any>(
  options?: ConstructorParameters<typeof IntersectionObserver>[1]
) {
  const [entry, setEntry] = createSignal<IntersectionObserverEntry | null>(null);

  let observer: IntersectionObserver | null = null;

  const ref = (element: T | null) => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (element === null) {
      setEntry(null);
      return;
    }

    observer = new IntersectionObserver(([_entry]) => {
      setEntry(_entry);
    }, options);

    observer.observe(element);
  };

  onCleanup(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });

  return { ref, entry };
}
