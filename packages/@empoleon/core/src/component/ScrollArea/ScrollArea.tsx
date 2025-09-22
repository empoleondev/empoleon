import { createEffect, createSignal, JSX, onCleanup, splitProps } from 'solid-js';
import { PossibleRef, useMergedRef } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { ScrollAreaCorner } from './ScrollAreaCorner/ScrollAreaCorner';
import { ScrollAreaRoot } from './ScrollAreaRoot/ScrollAreaRoot';
import { ScrollAreaScrollbar } from './ScrollAreaScrollbar/ScrollAreaScrollbar';
import { ScrollAreaThumb } from './ScrollAreaThumb/ScrollAreaThumb';
import { ScrollAreaViewport } from './ScrollAreaViewport/ScrollAreaViewport';
import classes from './ScrollArea.module.css';

export type ScrollAreaStylesNames =
  | 'root'
  | 'viewport'
  | 'scrollbar'
  | 'thumb'
  | 'corner'
  | 'content';

export type ScrollAreaCssVariables = {
  root: '--scrollarea-scrollbar-size';
};

export interface ScrollAreaProps
  extends BoxProps,
    StylesApiProps<ScrollAreaFactory>,
    ElementProps<'div'> {
  /** Scrollbar size, any valid CSS value for width/height, numbers are converted to rem, default value is 0.75rem */
  scrollbarSize?: number | string;

  /**
   * Defines scrollbars behavior, `hover` by default
   * - `hover` – scrollbars are visible when mouse is over the scroll area
   * - `scroll` – scrollbars are visible when the scroll area is scrolled
   * - `always` – scrollbars are always visible
   * - `never` – scrollbars are always hidden
   * - `auto` – similar to `overflow: auto` – scrollbars are always visible when the content is overflowing
   * */
  type?: 'auto' | 'always' | 'scroll' | 'hover' | 'never';

  /** Scroll hide delay in ms, applicable only when type is set to `hover` or `scroll`, `1000` by default */
  scrollHideDelay?: number;

  /** Axis at which scrollbars must be rendered, `'xy'` by default */
  scrollbars?: 'x' | 'y' | 'xy' | false;

  /** Determines whether scrollbars should be offset with padding on given axis, `false` by default */
  offsetScrollbars?: boolean | 'x' | 'y' | 'present';

  /** Assigns viewport element (scrollable container) ref */
  viewportRef?: HTMLDivElement;

  /** Props passed down to the viewport element */
  viewportProps?: JSX.HTMLAttributes<HTMLDivElement>;

  /** Called with current position (`x` and `y` coordinates) when viewport is scrolled */
  onScrollPositionChange?: (position: { x: number; y: number }) => void;

  /** Called when scrollarea is scrolled all the way to the bottom */
  onBottomReached?: () => void;

  /** Called when scrollarea is scrolled all the way to the top */
  onTopReached?: () => void;

  /** Defines `overscroll-behavior` of the viewport */
  overscrollBehavior?: JSX.CSSProperties['overscroll-behavior'];
}

export interface ScrollAreaAutosizeProps extends ScrollAreaProps {}

export type ScrollAreaFactory = Factory<{
  props: ScrollAreaProps;
  ref: HTMLDivElement;
  stylesNames: ScrollAreaStylesNames;
  vars: ScrollAreaCssVariables;
  staticComponents: {
    Autosize: typeof ScrollAreaAutosize;
  };
}>;

const defaultProps: Partial<ScrollAreaProps> = {
  scrollHideDelay: 1000,
  type: 'hover',
  scrollbars: 'xy',
} satisfies Partial<ScrollAreaProps>;

const varsResolver = createVarsResolver<ScrollAreaFactory>(
  (_, props) => ({
    root: {
      '--scrollarea-scrollbar-size': rem(props.scrollbarSize),
      '--scrollarea-over-scroll-behavior': props.overscrollBehavior,
    },
  })
);

export const ScrollArea = factory<ScrollAreaFactory>(_props => {
  const props = useProps('ScrollArea', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'scrollbarSize',
    'vars',
    'type',
    'scrollHideDelay',
    'viewportProps',
    'viewportRef',
    'onScrollPositionChange',
    'children',
    'offsetScrollbars',
    'scrollbars',
    'onBottomReached',
    'onTopReached',
    'overscrollBehavior',
    'attributes',
    'ref'
  ]);

  const [scrollbarHovered, setScrollbarHovered] = createSignal(false);
  const [verticalThumbVisible, setVerticalThumbVisible] = createSignal(false);
  const [horizontalThumbVisible, setHorizontalThumbVisible] = createSignal(false);

  const getStyles = useStyles<ScrollAreaFactory>({
    name: 'ScrollArea',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  const [localViewportRef, setLocalViewportRef] = createSignal<HTMLDivElement>();
  const combiedViewportRef = useMergedRef(local.viewportRef, setLocalViewportRef);

  createEffect(() => {
    if (!localViewportRef()) {
      return;
    }

    if (local.offsetScrollbars !== 'present') {
      return;
    }

    const observer = new ResizeObserver(() => {
      const scrollProps = (localViewportRef() as HTMLDivElement);
      setVerticalThumbVisible(scrollProps.scrollHeight > scrollProps.clientHeight);
      setHorizontalThumbVisible(scrollProps.scrollWidth > scrollProps.clientWidth);
    });

    observer.observe((localViewportRef() as HTMLDivElement));

    onCleanup(() => observer.disconnect());
  });

  return (
    <ScrollAreaRoot
      getStyles={getStyles}
      type={local.type === 'never' ? 'always' : local.type}
      scrollHideDelay={local.scrollHideDelay}
      ref={local.ref}
      scrollbars={local.scrollbars}
      {...getStyles('root')}
      {...others}
    >
      <ScrollAreaViewport
        {...local.viewportProps}
        {...getStyles('viewport', { style: local.viewportProps?.style as any })}
        ref={combiedViewportRef}
        data-offset-scrollbars={local.offsetScrollbars === true ? 'xy' : local.offsetScrollbars || undefined}
        data-scrollbars={local.scrollbars || undefined}
        data-horizontal-hidden={
          local.offsetScrollbars === 'present' && !horizontalThumbVisible ? 'true' : undefined
        }
        data-vertical-hidden={
          local.offsetScrollbars === 'present' && !verticalThumbVisible ? 'true' : undefined
        }
        onScroll={(e: any) => {
          if (typeof local.viewportProps?.onScroll === 'function') {
            local.viewportProps?.onScroll?.(e);
          }
          local.onScrollPositionChange?.({ x: e.currentTarget.scrollLeft, y: e.currentTarget.scrollTop });
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          // threshold of -0.6 is required for some browsers that use sub-pixel rendering
          if (scrollTop - (scrollHeight - clientHeight) >= -0.6) {
            local.onBottomReached?.();
          }
          if (scrollTop === 0) {
            local.onTopReached?.();
          }
        }}
      >
        {local.children}
      </ScrollAreaViewport>

      {(local.scrollbars === 'xy' || local.scrollbars === 'x') && (
        <ScrollAreaScrollbar
          {...getStyles('scrollbar') as any}
          orientation="horizontal"
          data-hidden={
            local.type === 'never' || (local.offsetScrollbars === 'present' && !horizontalThumbVisible())
              ? true
              : undefined
          }
          forceMount
          onMouseEnter={() => setScrollbarHovered(true)}
          onMouseLeave={() => setScrollbarHovered(false)}
        >
          <ScrollAreaThumb {...getStyles('thumb') as any} />
        </ScrollAreaScrollbar>
      )}

      {(local.scrollbars === 'xy' || local.scrollbars === 'y') && (
        <ScrollAreaScrollbar
          {...getStyles('scrollbar') as any}
          orientation="vertical"
          data-hidden={
            local.type === 'never' || (local.offsetScrollbars === 'present' && !verticalThumbVisible())
              ? true
              : undefined
          }
          forceMount
          onMouseEnter={() => setScrollbarHovered(true)}
          onMouseLeave={() => setScrollbarHovered(false)}
        >
          <ScrollAreaThumb {...getStyles('thumb') as any} />
        </ScrollAreaScrollbar>
      )}

      <ScrollAreaCorner
        {...getStyles('corner') as any}
        data-hovered={scrollbarHovered || undefined}
        data-hidden={local.type === 'never' || undefined}
      />
    </ScrollAreaRoot>
  );
});

ScrollArea.displayName = '@empoleon/core/ScrollArea';

export const ScrollAreaAutosize = factory<ScrollAreaFactory>(_props => {
  const props = useProps('ScrollAreaAutosize', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'classNames',
    'styles',
    'scrollbarSize',
    'scrollHideDelay',
    'type',
    'dir',
    'offsetScrollbars',
    'viewportRef',
    'onScrollPositionChange',
    'unstyled',
    'variant',
    'viewportProps',
    'scrollbars',
    'style',
    'vars',
    'onBottomReached',
    'onTopReached',
    'ref'
  ]);

  return (
    <Box {...others} ref={local.ref} style={[{ display: 'flex', overflow: 'auto' }, local.style]}>
      <Box style={{ display: 'flex', 'flex-direction': 'column', flex: 1 }}>
        <ScrollArea
          classNames={local.classNames}
          styles={local.styles}
          scrollHideDelay={local.scrollHideDelay}
          scrollbarSize={local.scrollbarSize}
          type={local.type}
          dir={local.dir}
          offsetScrollbars={local.offsetScrollbars}
          viewportRef={local.viewportRef}
          onScrollPositionChange={local.onScrollPositionChange}
          unstyled={local.unstyled}
          variant={local.variant}
          viewportProps={local.viewportProps}
          vars={local.vars}
          scrollbars={local.scrollbars}
          onBottomReached={local.onBottomReached}
          onTopReached={local.onTopReached}
        >
          {local.children}
        </ScrollArea>
      </Box>
    </Box>
  );
});

ScrollArea.classes = classes;
ScrollAreaAutosize.displayName = '@empoleon/core/ScrollAreaAutosize';
ScrollAreaAutosize.classes = classes;
ScrollArea.Autosize = ScrollAreaAutosize;
