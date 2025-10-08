import { createResizeObserver, makeResizeObserver } from '@solid-primitives/resize-observer';
import { Accessor, createEffect, createSignal, onCleanup } from 'solid-js';

// Define the shape of the observed bounding box
export type ObserverRect = Omit<DOMRectReadOnly, 'toJSON'>;
const defaultRect: ObserverRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

/**
 * SolidJS equivalent of React's useResizeObserver
 * @param options native ResizeObserverOptions
 * @returns [refSetter, rectAccessor]
 */
export function useResizeObserver<T extends HTMLElement = any>(
  options?: ResizeObserverOptions
): readonly [
  /** attach to your element: `<div ref={setRef}>` */
  (el: T | undefined) => void,
  /** reactive rect: `{ x, y, width, height, top, left, bottom, right }` */
  Accessor<ObserverRect>,
] {
  const [el, setEl] = createSignal<T>();
  const [rect, setRect] = createSignal<ObserverRect>(defaultRect);

  const { observe, unobserve } = makeResizeObserver<T>((entries) => {
    const entry = entries[0];
    if (entry) {setRect(entry.contentRect)};
  }, options);

  createEffect(() => {
    const node = el();
    if (node) {
      observe(node);
      onCleanup(() => unobserve(node));
    }
  });

  return [setEl, rect] as const;
}

/**
 * SolidJS equivalent of React's useElementSize
 * @param options native ResizeObserverOptions
 * @returns { ref, width, height }
 */

export function useElementSize<T extends HTMLElement = any>(
  options?: ResizeObserverOptions
): {
  /** Attach to your element: `<div ref={setRef}>…</div>` */
  ref: (el: T | undefined) => void;
  /** Reactive width (never null) */
  width: Accessor<number>;
  /** Reactive height (never null) */
  height: Accessor<number>;
} {
  const [el, setEl] = createSignal<T | undefined>();
  const [width, setWidth] = createSignal<number>(0);
  const [height, setHeight] = createSignal<number>(0);

  createResizeObserver(el, ({ width: w, height: h }) => {
    setWidth(w ?? 0);
    setHeight(h ?? 0);
  }, options);

  return { ref: setEl, width, height };
}
