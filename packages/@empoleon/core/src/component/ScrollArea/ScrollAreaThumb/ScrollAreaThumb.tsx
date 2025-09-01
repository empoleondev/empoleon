import { onMount, onCleanup, JSX, splitProps, Show } from 'solid-js';
import { useDebouncedCallback, useMergedRef } from '@empoleon/hooks';    // your Solid version
import { useScrollAreaContext } from '../ScrollArea.context';       // assume rewritten as Solid context
import { useScrollbarContext } from '../ScrollAreaScrollbar/Scrollbar.context';
import { addUnlinkedScrollListener, composeEventHandlers } from '../utils';

interface ThumbProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Thumb(props: ThumbProps) {
  const [local, others] = splitProps(props, [
    "style", "onPointerDown", "onPointerUp", "ref"
  ]);

  const scrollAreaContext = useScrollAreaContext();
  const scrollbarContext = useScrollbarContext();
  const { onThumbPositionChange } = scrollbarContext;
  const composedRef = useMergedRef(local.ref, (el: HTMLDivElement) => scrollbarContext.onThumbChange(el));

  const removeListenerRef: { current?: () => void } = {};
  const debounceScrollEnd = useDebouncedCallback(() => {
    removeListenerRef.current?.();
    removeListenerRef.current = undefined;
  }, 100);

  onMount(() => {
    const viewport = scrollAreaContext.viewport;
    if (viewport) {
      const handleScroll = () => {
        debounceScrollEnd();
        if (!removeListenerRef.current) {
          const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
          removeListenerRef.current = listener;
          onThumbPositionChange();
        }
      };
      onThumbPositionChange();
      viewport.addEventListener('scroll', handleScroll);

      // cleanup
      onCleanup(() => viewport.removeEventListener('scroll', handleScroll));
    }

    return undefined;
  });

  return (
    <div
      data-state={scrollbarContext.hasThumb ? 'visible' : 'hidden'}
      {...others}
      ref={composedRef}
      style={{ width: 'var(--sa-thumb-width)', height: 'var(--sa-thumb-height)', ...(typeof local.style === 'object' && local.style !== null ? local.style : {})  }}
      onPointerDown={
        composeEventHandlers(
          local.onPointerDown as (e: PointerEvent & { currentTarget: HTMLDivElement; target: Element }) => void,
          (event) => {
            const thumb = event.target as HTMLElement;
            const thumbRect = thumb.getBoundingClientRect();
            const x = event.clientX - thumbRect.left;
            const y = event.clientY - thumbRect.top;
            scrollbarContext.onThumbPointerDown({ x, y });
          }
        )
      }
      onPointerUp={
        composeEventHandlers(
          local.onPointerUp as (e: PointerEvent & { currentTarget: HTMLDivElement; target: Element }) => void,
          () => scrollbarContext.onThumbPointerUp()
        )
      }
    />
  );
}

interface ScrollAreaThumbProps extends ThumbProps {
  forceMount?: true;
  ref?: HTMLDivElement;
}

export function ScrollAreaThumb(props: ScrollAreaThumbProps) {
  const [local, thumbProps] = splitProps(props, [
    'forceMount',
    'ref'
  ]);
  const scrollbarContext = useScrollbarContext();
  const hasThumb = () => scrollbarContext.hasThumb;

  return (
    <Show when={local.forceMount || hasThumb()}>
      <Thumb ref={local.ref} {...thumbProps} />
    </Show>
  );
}

ScrollAreaThumb.displayName = '@empoleon/core/ScrollAreaThumb';
