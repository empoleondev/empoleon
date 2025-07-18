import {
  createSignal,
  splitProps,
  Switch,
  Match,
} from 'solid-js';
import { useDirection } from '../../../core';
import { useScrollAreaContext } from '../ScrollArea.context';
import {
  ScrollAreaScrollbarX,
} from './ScrollbarX';
import {
  ScrollAreaScrollbarY,
} from './ScrollbarY';
import {
  getScrollPositionFromPointer,
  getThumbOffsetFromScroll,
  getThumbRatio,
} from '../utils';

export interface ScrollAreaScrollbarVisibleProps {
  orientation?: 'horizontal' | 'vertical';
  sizes?: any;
  onSizesChange?: any;
  style?: any;
  ref?: any;
  [key: string]: any;
}

export function ScrollAreaScrollbarVisible(props: ScrollAreaScrollbarVisibleProps) {
  const [local, others] = splitProps(props, ['orientation', 'ref']);

  const ctx = useScrollAreaContext();
  const { dir } = useDirection();

  let thumbEl: HTMLDivElement | null;
  let pointerOffset = 0;

  const [sizes, setSizes] = createSignal({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
  });

  const thumbRatio = () => getThumbRatio(sizes().viewport, sizes().content);

  const getScrollPosition = (pointerPos: number, direction?: 'ltr' | 'rtl') =>
    getScrollPositionFromPointer(pointerPos, pointerOffset, sizes(), direction);

  return (
    <Switch fallback={null}>
      <Match when={(local.orientation ?? 'vertical') === 'horizontal'}>
        <ScrollAreaScrollbarX
          {...others}
          ref={local.ref}
          sizes={sizes()}
          onSizesChange={setSizes}
          hasThumb={thumbRatio() > 0 && thumbRatio() < 1}
          onThumbChange={(el) => (thumbEl = el)}
          onThumbPointerUp={() => (pointerOffset = 0)}
          onThumbPointerDown={(pos) => (pointerOffset = pos)}
          onThumbPositionChange={() => {
            if (ctx.viewport && thumbEl) {
              const scrollPos = ctx.viewport.scrollLeft;
              const offset = getThumbOffsetFromScroll(scrollPos, sizes(), dir);
              thumbEl.style.transform = `translate3d(${offset}px, 0, 0)`;
            }
          }}
          onWheelScroll={(scrollPos) => {
            if (ctx.viewport) ctx.viewport.scrollLeft = scrollPos;
          }}
          onDragScroll={(pointerPos) => {
            if (ctx.viewport)
              ctx.viewport.scrollLeft = getScrollPosition(pointerPos, dir);
          }}
        />
      </Match>

      <Match when={(local.orientation ?? 'vertical') === 'vertical'}>
        <ScrollAreaScrollbarY
          {...others}
          ref={local.ref}
          sizes={sizes()}
          onSizesChange={setSizes}
          hasThumb={thumbRatio() > 0 && thumbRatio() < 1}
          onThumbChange={(el) => (thumbEl = el)}
          onThumbPointerUp={() => (pointerOffset = 0)}
          onThumbPointerDown={(pos) => (pointerOffset = pos)}
          onThumbPositionChange={() => {
            if (ctx.viewport && thumbEl) {
              const scrollPos = ctx.viewport.scrollTop;
              const offset = getThumbOffsetFromScroll(scrollPos, sizes());
              thumbEl.style.setProperty(
                '--thumb-opacity',
                sizes().scrollbar.size === 0 ? '0' : '1'
              );
              thumbEl.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
          }}
          onWheelScroll={(scrollPos) => {
            if (ctx.viewport) ctx.viewport.scrollTop = scrollPos;
          }}
          onDragScroll={(pointerPos) => {
            if (ctx.viewport)
              ctx.viewport.scrollTop = getScrollPosition(pointerPos);
          }}
        />
      </Match>
    </Switch>
  );
}
