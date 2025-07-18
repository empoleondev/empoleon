import {
  createSignal,
  createEffect,
  onCleanup,
  Accessor,
} from "solid-js";
import {
  makeResizeObserver,
  createElementSize,
} from "@solid-primitives/resize-observer";

// Define the shape of the observed bounding box
export type ObserverRect = Omit<DOMRectReadOnly, "toJSON">;
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
  Accessor<ObserverRect>
] {
  const [el, setEl] = createSignal<T>();
  const [rect, setRect] = createSignal<ObserverRect>(defaultRect);

  const { observe, unobserve } = makeResizeObserver<T>(
    (entries) => {
      const entry = entries[0];
      if (entry) setRect(entry.contentRect);
    },
    options
  );

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
  // 1) Signal to hold the target element
  const [el, setEl] = createSignal<T | undefined>();

  // 2) Primitive store { width, height } driven by ResizeObserver under the hood
  const size = createElementSize(el);

  // 3) Coerce null to 0 so width/height are always numbers
  const width: Accessor<number> = () => size.width ?? 0;
  const height: Accessor<number> = () => size.height ?? 0;

  return { ref: setEl, width, height };
}
