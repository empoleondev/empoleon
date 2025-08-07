import {
  createSignal,
  createEffect,
  onCleanup,
  splitProps,
  Show,
} from 'solid-js';
import { useDebouncedCallback } from '@empoleon/hooks';
import { useScrollAreaContext } from '../ScrollArea.context';
import { composeEventHandlers } from '../utils';
import {
  ScrollAreaScrollbarVisible,
  ScrollAreaScrollbarVisibleProps,
} from './ScrollAreaScrollbarVisible';

export interface ScrollAreaScrollbarScrollProps
  extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true;
}

export function ScrollAreaScrollbarScroll(props: ScrollAreaScrollbarScrollProps) {
  const [local, others] = splitProps(props, ['forceMount', 'ref', 'orientation']);
  const context = useScrollAreaContext();
  const isHorizontal = () => local.orientation === 'horizontal';
  const [state, setState] = createSignal<'hidden' | 'idle' | 'interacting' | 'scrolling'>('hidden');
  const debounceScrollEnd = useDebouncedCallback(() => setState('idle'), 100);

  createEffect(() => {
    if (state() === 'idle') {
      const hideTimer = window.setTimeout(() => setState('hidden'), context.scrollHideDelay);
      onCleanup(() => window.clearTimeout(hideTimer));
    }
  });

  createEffect(() => {
    const { viewport } = context;
    const scrollDirection = isHorizontal() ? 'scrollLeft' : 'scrollTop';

    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          setState('scrolling');
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener('scroll', handleScroll);
      onCleanup(() => viewport.removeEventListener('scroll', handleScroll));
    }
  });

  return (
    <Show when={local.forceMount || state() !== 'hidden'} fallback={null}>
      <ScrollAreaScrollbarVisible
        data-state={state() === 'hidden' ? 'hidden' : 'visible'}
        {...others}
        ref={local.ref}
        onPointerEnter={composeEventHandlers(others.onPointerEnter as any, () => setState('interacting'))}
        onPointerLeave={composeEventHandlers(others.onPointerLeave as any, () => setState('idle'))}
      />
    </Show>
  );
}
