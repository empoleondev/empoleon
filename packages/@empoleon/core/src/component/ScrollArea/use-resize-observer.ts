import { createEffect, onCleanup, Accessor } from 'solid-js';

export function useResizeObserver(
  element: Accessor<HTMLElement | null> | HTMLElement | null,
  onResize: () => void
) {
  createEffect(() => {
    let rAF = 0;

    // Get the current element value
    const currentElement = typeof element === 'function' ? element() : element;

    if (currentElement) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(onResize);
      });

      resizeObserver.observe(currentElement);

      onCleanup(() => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(currentElement);
      });
    }
  });
}
