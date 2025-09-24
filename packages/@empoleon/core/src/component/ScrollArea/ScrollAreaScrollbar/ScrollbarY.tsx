import { createSignal, onCleanup, onMount, splitProps } from 'solid-js';
import { PossibleRef, useMergedRef } from '@empoleon/hooks';
import { useScrollAreaContext } from '../ScrollArea.context';
import { ScrollAreaScrollbarAxisProps } from '../ScrollArea.types';
import { getThumbSize, isScrollingWithinScrollbarBounds, toInt } from '../utils';
import { Scrollbar } from './Scrollbar';

export function ScrollAreaScrollbarY(props: ScrollAreaScrollbarAxisProps) {
  const [local, others] = splitProps(props, [
    'children',
    'sizes',
    'onSizesChange',
    'style',
    'ref',
  ]);

  const ctx = useScrollAreaContext();
  const [computedStyle, setComputedStyle] = createSignal<CSSStyleDeclaration>();
  const [ref, setRef] = createSignal<Element>();

  onMount(() => {
    if (ref()) {
      setComputedStyle(window.getComputedStyle(ref() as Element));
      ctx.onScrollbarYChange(ref() as HTMLDivElement);
    }
  });

  onCleanup(() => {
    ctx.onScrollbarYChange(null);
  });

  return (
    <Scrollbar
      {...others}
      data-orientation="vertical"
      ref={useMergedRef(local.ref, setRef)}
      sizes={local.sizes}
      style={{
        "--sa-thumb-height": `${getThumbSize(local.sizes)}px`,
        ...(typeof local.style === 'object' && local.style !== null ? local.style : {})
      }}
      onThumbPointerDown={(pointerPos: { x: number; y: number }) =>
        props.onThumbPointerDown(pointerPos.y)
      }
      onDragScroll={(pointerPos: { x: number; y: number }) =>
        props.onDragScroll(pointerPos.y)
      }
      onWheelScroll={(
        event: WheelEvent,
        maxScrollPos: number
      ) => {
        if (ctx.viewport) {
          const scrollPos = ctx.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      }}
      onResize={() => {
        if (ref() && ctx.viewport && computedStyle()) {
          local.onSizesChange({
            content: ctx.viewport.scrollHeight,
            viewport: ctx.viewport.offsetHeight,
            scrollbar: {
              size: ref()!.clientHeight,
              paddingStart: toInt(computedStyle()?.paddingTop),
              paddingEnd: toInt(computedStyle()?.paddingBottom),
            },
          });
        }
      }}
    >
      {local.children}
    </Scrollbar>
  );
}

ScrollAreaScrollbarY.displayName = '@empoleon/core/ScrollAreaScrollbarY';
