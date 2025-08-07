// import { onCleanup, createEffect, on } from 'solid-js';

// export function useResizeObserver(element: () => HTMLElement | null, onResize: () => void) {
//   let resizeObserver: ResizeObserver | undefined;
//   let rAF = 0;

//   const handleResize = () => {
//     cancelAnimationFrame(rAF);
//     rAF = window.requestAnimationFrame(onResize);
//   };

//   createEffect(on(element, (el) => {
//     if (resizeObserver) {
//       window.cancelAnimationFrame(rAF);
//       resizeObserver.disconnect();
//     }

//     if (el) {
//       resizeObserver = new ResizeObserver(handleResize);
//       resizeObserver.observe(el);
//     }
//   }));

//   onCleanup(() => {
//     if (resizeObserver) {
//       window.cancelAnimationFrame(rAF);
//       resizeObserver.disconnect();
//     }
//   });
// }

import { createEffect, onCleanup, Accessor } from 'solid-js';

export function useResizeObserver(
  element: Accessor<HTMLElement | null> | HTMLElement | null,
  onResize: () => void
) {
  createEffect(() => {
    let rAF = 0;

    // Get the current element value
    const currentElement = typeof element === 'function' ? element() : element;

    console.log('useResizeObserver effect running with element:', {
      element: currentElement,
      hasElement: !!currentElement,
      elementTagName: currentElement?.tagName
    });

    if (currentElement) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(onResize);
      });

      resizeObserver.observe(currentElement);
      console.log('ResizeObserver attached to:', currentElement.tagName);

      onCleanup(() => {
        console.log('Cleaning up ResizeObserver');
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(currentElement);
      });
    } else {
      console.log('useResizeObserver: no valid element, skipping observer setup');
    }
  });
}
