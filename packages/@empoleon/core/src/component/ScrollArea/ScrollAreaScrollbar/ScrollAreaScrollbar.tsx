import { createEffect, Match, onCleanup, splitProps, Switch } from 'solid-js';
import { useScrollAreaContext } from '../ScrollArea.context';
import { ScrollAreaScrollbarAuto } from './ScrollAreaScrollbarAuto';
import { ScrollAreaScrollbarHover } from './ScrollAreaScrollbarHover';
import { ScrollAreaScrollbarScroll } from './ScrollAreaScrollbarScroll';
import {
  ScrollAreaScrollbarVisible,
  ScrollAreaScrollbarVisibleProps,
} from './ScrollAreaScrollbarVisible';

export interface ScrollAreaScrollbarProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true;
}

export function ScrollAreaScrollbar(props: ScrollAreaScrollbarProps) {
  const [local, others] = splitProps(props, [
    'forceMount',
    'ref',
    'orientation'
  ]);

  const ctx = useScrollAreaContext();
  const isHorizontal = () => local.orientation === 'horizontal';

  createEffect(() => {
    if (isHorizontal()) ctx.onScrollbarXEnabledChange(true);
    else ctx.onScrollbarYEnabledChange(true);

    onCleanup(() => {
      if (isHorizontal()) ctx.onScrollbarXEnabledChange(false);
      else ctx.onScrollbarYEnabledChange(false);
    });
  });

  return (
    <Switch fallback={null}>
      <Match when={ctx.type === "hover"}>
        <ScrollAreaScrollbarHover {...others} ref={local.ref} forceMount={local.forceMount} orientation={local.orientation} />
      </Match>
      <Match when={ctx.type === "scroll"}>
        <ScrollAreaScrollbarScroll {...others} ref={local.ref} forceMount={local.forceMount} orientation={local.orientation} />
      </Match>
      <Match when={ctx.type === "auto"}>
        <ScrollAreaScrollbarAuto {...others} ref={local.ref} forceMount={local.forceMount} orientation={local.orientation} />
      </Match>
      <Match when={ctx.type === "always"}>
        <ScrollAreaScrollbarVisible {...others} ref={local.ref} />
      </Match>
    </Switch>
  );
}

ScrollAreaScrollbar.displayName = '@empoleon/core/ScrollAreaScrollbar';
