import { JSX, createSignal, createEffect, onCleanup, onMount, splitProps } from 'solid-js';
import { useScrollAreaContext } from '../ScrollArea.context';
import {
  ScrollbarContextValue,
  ScrollbarProvider,
} from './Scrollbar.context';
import { Sizes } from '../ScrollArea.types';
import { useDebouncedCallback, useMergedRef } from '@empoleon/hooks';
import { composeEventHandlers } from '../utils';
import { useResizeObserver } from '../use-resize-observer';

export interface ScrollbarPrivateProps {
  sizes: Sizes;
  hasThumb: boolean;
  onThumbChange: ScrollbarContextValue['onThumbChange'];
  onThumbPointerUp: ScrollbarContextValue['onThumbPointerUp'];
  onThumbPointerDown: ScrollbarContextValue['onThumbPointerDown'];
  onThumbPositionChange: ScrollbarContextValue['onThumbPositionChange'];
  onWheelScroll: (event: WheelEvent, maxScrollPos: number) => void;
  onDragScroll: (pointerPos: { x: number; y: number }) => void;
  onResize: () => void;
}

export function Scrollbar(props: ScrollbarPrivateProps & JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, scrollbarProps] = splitProps(props, [
    'sizes',
    'hasThumb',
    'onThumbChange',
    'onThumbPointerUp',
    'onThumbPointerDown',
    'onThumbPositionChange',
    'onDragScroll',
    'onWheelScroll',
    'onResize',
    'ref',
  ]);

  const context = useScrollAreaContext();
  const [scrollbar, setScrollbar] = createSignal<HTMLDivElement |  null>(null);
  const composeRefs = useMergedRef(local.ref, (node: HTMLDivElement) => setScrollbar(node));
  const [rectRef, setRect] = createSignal<DOMRect | null>(null);
  const [prevWebkitUserSelectRef, setPrevWebkitUserSelectRef] = createSignal('');
  const { viewport } = context;
  const maxScrollPos = () => local.sizes.content - local.sizes.viewport;
  const handleResize = useDebouncedCallback(local.onResize, 10);

  const handleDragScroll = (e: PointerEvent) => {
    const rect = rectRef();

    if (rect !== null){
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      local.onDragScroll({ x, y });
    }
  };

  createEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const isScrollWheel = scrollbar()?.contains(target);
      if (isScrollWheel) {
        local.onWheelScroll(e, maxScrollPos());
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false } as AddEventListenerOptions);

    onCleanup(() => {
      document.removeEventListener('wheel', handleWheel, { passive: false } as AddEventListenerOptions);
    });
  });

  // update thumb position when sizes change
  createEffect(() => local.onThumbPositionChange());

  // resize observer
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(() => context.content, handleResize);

  return (
    <ScrollbarProvider value={{
      scrollbar: scrollbar(),
      hasThumb: local.hasThumb,
      onThumbChange: local.onThumbChange,
      onThumbPointerUp: local.onThumbPointerUp,
      onThumbPositionChange: local.onThumbPositionChange,
      onThumbPointerDown: local.onThumbPointerDown,
    }}>
      <div
        {...scrollbarProps}
        ref={composeRefs}
        data-empoleon-scrollbar
        style={{
          position: 'absolute',
          ...(typeof scrollbarProps.style === 'object' && scrollbarProps.style !== null ? scrollbarProps.style : {})
        }}
        onPointerDown={composeEventHandlers(local.onThumbPointerDown, (e: PointerEvent) => {
          e.preventDefault();
          if (e.button === 0) {
            const el = e.currentTarget as HTMLElement;
            el.setPointerCapture(e.pointerId);
            setRect(scrollbar()!.getBoundingClientRect());
            setPrevWebkitUserSelectRef(document.body.style.webkitUserSelect);
            document.body.style.webkitUserSelect = 'none';
            handleDragScroll(e);
          }
        })}
        onPointerMove={composeEventHandlers(local.onThumbPositionChange, handleDragScroll)}
        onPointerUp={composeEventHandlers(local.onThumbPointerUp, (e: PointerEvent) => {
          const el = e.currentTarget as HTMLElement;
          if (el.hasPointerCapture(e.pointerId)) {
            e.preventDefault();
            el.releasePointerCapture(e.pointerId);
          }
        })}
        onLostPointerCapture={() => {
          document.body.style.webkitUserSelect = prevWebkitUserSelectRef();
          setRect(null);
        }}
      />
    </ScrollbarProvider>
  );
}
