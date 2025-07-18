// useCollapse.ts
import { createSignal, createEffect, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import type { JSX } from 'solid-js';
import type { CSSProperties } from '../../core';

// same helper as before
function getAutoHeightDuration(height: number | string) {
  if (!height || typeof height === 'string') return 0;
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

export function getElementHeight(el?: HTMLElement | null) {
  return el ? el.scrollHeight : 'auto';
}

interface UseCollapse {
  opened: boolean;
  transitionDuration?: number;
  transitionTimingFunction?: string;
  onTransitionEnd?: () => void;
}

type GetCollapseProps = JSX.HTMLAttributes<HTMLDivElement>;

export function useCollapse(props: UseCollapse) {
  // ref signal to hold the DOM node
  const [el, setEl] = createSignal<HTMLElement | null>(null);

  const collapsedHeight = 0;
  const collapsedStyles: CSSProperties = {
    display: 'none',
    height: 0,
    overflow: 'hidden',
  };

  // reactive style store
  const [styles, setStyles] = createStore<CSSProperties>(
    props.opened ? {} : collapsedStyles
  );

  // effect runs on initial mount and whenever props.opened changes
  createEffect(() => {
    const opened = props.opened;
    const timing = props.transitionTimingFunction || 'ease';
    const duration =
      props.transitionDuration ?? getAutoHeightDuration(0);
    const node = el();
    if (!node || typeof window === 'undefined') return;

    const raf = window.requestAnimationFrame;
    if (opened) {
      raf(() => {
        setStyles({ willChange: 'height', display: 'block', overflow: 'hidden' });
        raf(() => {
          let h = getElementHeight(node);
          if (h !== 'auto') { h = `${h}px`; }
          setStyles({
            transition: `height ${duration}ms ${timing}, opacity ${duration}ms ${timing}`,
            height: h,
          });
        });
      });
    } else {
      raf(() => {
        let h = getElementHeight(node);
        if (h !== 'auto') { h = `${h}px`; }
        const d = props.transitionDuration ?? getAutoHeightDuration(h);
        setStyles({
          transition: `height ${d}ms ${timing}, opacity ${d}ms ${timing}`,
          willChange: 'height',
          height: h,
        });
        raf(() => {
          setStyles({ height: collapsedHeight, overflow: 'hidden' });
        });
      });
    }
  });

  // handle end of height transition
  function handleTransitionEnd(e: TransitionEvent) {
    const node = el();
    if (e.target !== node || e.propertyName !== 'height') return;
    if (props.opened) {
      const h = (node && node.scrollHeight) || 0;
      if (h === styles.height) {
        setStyles({});
      } else {
        setStyles({ height: `${h}px` });
      }
      props.onTransitionEnd?.();
    } else if (styles.height === collapsedHeight) {
      setStyles(collapsedStyles);
      props.onTransitionEnd?.();
    }
  }

  // returned function to spread onto the collapse container
  function getCollapseProps(): GetCollapseProps {
    return {
      // maintain ARIA
      'aria-hidden': !props.opened,
      // capture DOM node
      ref: setEl,
      // listen for native transitionend
      onTransitionEnd: handleTransitionEnd as any,
      // merge computed styles
      style: { 'box-sizing': 'border-box', ...styles },
    };
  }

  return getCollapseProps;
}
