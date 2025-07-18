import {
  createSignal,
  splitProps,
  Show,
} from 'solid-js';
import { useDebouncedCallback } from '@empoleon/hooks';
import { useScrollAreaContext } from '../ScrollArea.context';
import { useResizeObserver } from '../use-resize-observer';
import {
  ScrollAreaScrollbarVisible,
  ScrollAreaScrollbarVisibleProps,
} from './ScrollAreaScrollbarVisible';

export interface ScrollAreaScrollbarAutoProps
  extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true;
}

export function ScrollAreaScrollbarAuto(props: ScrollAreaScrollbarAutoProps) {
  const [local, others] = splitProps(props, [
    'forceMount',
    'ref',
    'orientation'
  ]);
  const ctx = useScrollAreaContext();
  const [visible, setVisible] = createSignal(false);
  const isHorizontal = () => local.orientation === 'horizontal';

  const handleResize = useDebouncedCallback(() => {
    if (ctx.viewport) {
      const overflowX = ctx.viewport.offsetWidth < ctx.viewport.scrollWidth;
      const overflowY = ctx.viewport.offsetHeight < ctx.viewport.scrollHeight;
      setVisible(isHorizontal() ? overflowX : overflowY);
    }
  }, 10);

  useResizeObserver(() => ctx.viewport, handleResize);
  useResizeObserver(() => ctx.content, handleResize);

  return (
    <Show when={local.forceMount || visible()} fallback={null}>
      <ScrollAreaScrollbarVisible
        data-state={visible() ? 'visible' : 'hidden'}
        {...others}
        ref={local.ref}
      />
    </Show>
  );
}

ScrollAreaScrollbarAuto.displayName = '@empoleon/core/ScrollAreaScrollbarAuto';
