import { createSignal, onCleanup, onMount, splitProps } from 'solid-js';
import { PossibleRef, useMergedRef } from '@empoleon/hooks';
import { useScrollAreaContext } from '../ScrollArea.context';
import { ScrollAreaScrollbarAxisProps } from '../ScrollArea.types';
import { getThumbSize, isScrollingWithinScrollbarBounds, toInt } from '../utils';
import { Scrollbar } from './Scrollbar';

export function ScrollAreaScrollbarX(props: ScrollAreaScrollbarAxisProps) {
  const [local, others] = splitProps(props, [
    'children',
    'sizes',
    'onSizesChange',
    'style',
    'ref'
  ]);

  const ctx = useScrollAreaContext();
  const [computedStyle, setComputedStyle] = createSignal<CSSStyleDeclaration>();
  const [ref, setRef] = createSignal<Element>();

  onMount(() => {
    if (ref()) {
      setComputedStyle(window.getComputedStyle(ref() as Element));
      ctx.onScrollbarXChange(ref() as HTMLDivElement);
    }
  });

  onCleanup(() => {
    ctx.onScrollbarXChange(null);
  });

  return (
    <Scrollbar
      {...others}
      data-orientation="horizontal"
      ref={useMergedRef(local.ref, setRef)}
      sizes={local.sizes}
      style={{
        '--sa-thumb-width': `${getThumbSize(local.sizes)}px`,
        ...(typeof local.style === 'object' && local.style ? local.style : {}),
      }}
      onThumbPointerDown={(pointerPos: { x: number; y: number }) =>
        props.onThumbPointerDown(pointerPos.x)
      }
      onDragScroll={(pointerPos: { x: number; y: number }) =>
        props.onDragScroll(pointerPos.x)
      }
      onWheelScroll={(
        event: WheelEvent,
        maxScrollPos: number
      ) => {
        if (ctx.viewport) {
          const scrollPos = ctx.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      }}
      onResize={() => {
        if (ref() && ctx.viewport && computedStyle()) {
          local.onSizesChange({
            content: ctx.viewport.scrollWidth,
            viewport: ctx.viewport.offsetWidth,
            scrollbar: {
              size: ref()!.clientWidth,
              paddingStart: toInt(computedStyle()?.paddingLeft),
              paddingEnd: toInt(computedStyle()?.paddingRight),
            },
          });
        }
      }}
    >
      {local.children}
    </Scrollbar>
  );
}

ScrollAreaScrollbarX.displayName = '@empoleon/core/ScrollAreaScrollbarX';
