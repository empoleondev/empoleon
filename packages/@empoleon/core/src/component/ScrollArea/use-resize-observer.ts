import { onCleanup, createEffect, on } from 'solid-js';

export function useResizeObserver(element: () => HTMLElement | null, onResize: () => void) {
  let resizeObserver: ResizeObserver | undefined;
  let rAF = 0;

  // Helper function to handle resize with requestAnimationFrame
  const handleResize = () => {
    cancelAnimationFrame(rAF);
    rAF = window.requestAnimationFrame(onResize);
  };

  // Setup the observer when the element is available
  createEffect(on(element, (el) => {
    // Clean up previous observer if it exists
    if (resizeObserver) {
      window.cancelAnimationFrame(rAF);
      resizeObserver.disconnect();
    }

    // Create new observer if element exists
    if (el) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(el);
    }
  }));

  // Clean up on component unmount
  onCleanup(() => {
    if (resizeObserver) {
      window.cancelAnimationFrame(rAF);
      resizeObserver.disconnect();
    }
  });
}
