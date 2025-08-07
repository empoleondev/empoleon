import { createSignal, splitProps, Show, JSX } from "solid-js";
import { useScrollAreaContext } from "../ScrollArea.context";
import { useResizeObserver } from "../use-resize-observer";

interface ScrollAreaCornerProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Corner(props: ScrollAreaCornerProps) {
  const [local, others] = splitProps(props, ["style", "ref"]);
  const store = useScrollAreaContext();
  const [width, setWidth] = createSignal(0);
  const [height, setHeight] = createSignal(0);
  const hasSize = () => Boolean(width() && height());

  useResizeObserver(() => store.scrollbarX, () => {
    const h = store.scrollbarX?.offsetHeight || 0;
    store.onCornerHeightChange(h);
    setHeight(h);
  });

  useResizeObserver(() => store.scrollbarY, () => {
    const w = store.scrollbarY?.offsetWidth || 0;
    store.onCornerWidthChange(w);
    setWidth(w);
  });

  return (
    <Show when={hasSize()}>
      <div
        {...others}
        ref={local.ref}
        style={{
          width: `${width()}px`,
          height: `${height()}px`,
          ...(typeof local.style === "object" && local.style !== null
            ? local.style
            : {}),
        }}
      />
    </Show>
  );
}

export function ScrollAreaCorner(props: ScrollAreaCornerProps) {
  const ctx = useScrollAreaContext();
  const hasBothScrollbarsVisible = () => Boolean(ctx.scrollbarX && ctx.scrollbarY);
  const hasCorner = () => ctx.type !== "scroll" && hasBothScrollbarsVisible();

  return (
    <Show when={hasCorner()}>
      <Corner {...props} />
    </Show>
  );
}
