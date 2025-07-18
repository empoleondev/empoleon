import { createSignal, splitProps } from 'solid-js';
import { useMergedRef } from '@empoleon/hooks';
import { Box, BoxProps, ElementProps, Factory, GetStylesApi, useProps } from '../../../core';
import type { ScrollAreaFactory } from '../ScrollArea';
import { ScrollAreaProvider } from '../ScrollArea.context';

export type ScrollAreaRootStylesNames =
  | 'root'
  | 'viewport'
  | 'viewportInner'
  | 'scrollbar'
  | 'thumb'
  | 'corner';

export type ScrollAreaRootCssVariables = {
  root: '--sa-corner-width' | '--sa-corner-height';
};

export interface ScrollAreaRootStylesCtx {
  cornerWidth: number;
  cornerHeight: number;
}

export interface ScrollAreaRootProps extends BoxProps, ElementProps<'div'> {
  getStyles: GetStylesApi<ScrollAreaFactory>;
  type?: 'auto' | 'always' | 'scroll' | 'hover' | 'never';
  scrollbars?: 'x' | 'y' | 'xy' | false;
  scrollHideDelay?: number;
}

export type ScrollAreaRootFactory = Factory<{
  props: ScrollAreaRootProps;
  ref: HTMLDivElement;
  stylesNames: ScrollAreaRootStylesNames;
}>;

const defaultProps: Partial<ScrollAreaRootProps> = {
  scrollHideDelay: 1000,
  type: 'hover',
};

export function ScrollAreaRoot(_props: ScrollAreaRootProps) {
  const props = useProps('ScrollAreaRoot', defaultProps, _props);
  const [local, others] = splitProps(props, [
    "type", "scrollHideDelay", "scrollbars", "getStyles", "ref",
  ]);

  const [scrollArea, setScrollArea] = createSignal<HTMLDivElement | null>(null);
  const [viewport, setViewport] = createSignal<HTMLDivElement | null>(null);
  const [content, setContent] = createSignal<HTMLDivElement | null>(null);
  const [scrollbarX, setScrollbarX] = createSignal<HTMLDivElement | null>(null);
  const [scrollbarY, setScrollbarY] = createSignal<HTMLDivElement | null>(null);
  const [cornerWidth, setCornerWidth] = createSignal(0);
  const [cornerHeight, setCornerHeight] = createSignal(0);
  const [scrollbarXEnabled, setScrollbarXEnabled] = createSignal(false);
  const [scrollbarYEnabled, setScrollbarYEnabled] = createSignal(false);
  const rootRef = useMergedRef(local.ref, (node: HTMLDivElement) => setScrollArea(node));

  return (
    <ScrollAreaProvider value={{
      type: local.type!,
      scrollHideDelay: local.scrollHideDelay!,
      scrollArea: scrollArea(),
      viewport: viewport(),
      onViewportChange: setViewport,
      content: content(),
      onContentChange: setContent,
      scrollbarX: scrollbarX(),
      onScrollbarXChange: setScrollbarX,
      scrollbarXEnabled: scrollbarXEnabled(),
      onScrollbarXEnabledChange: setScrollbarXEnabled,
      scrollbarY: scrollbarY(),
      onScrollbarYChange: setScrollbarY,
      scrollbarYEnabled: scrollbarYEnabled(),
      onScrollbarYEnabledChange: setScrollbarYEnabled,
      onCornerWidthChange: setCornerWidth,
      onCornerHeightChange: setCornerHeight,
      getStyles: local.getStyles,
    }}>
      <Box
        {...others}
        ref={rootRef}
        __vars={{
          '--sa-corner-width': local.scrollbars !== 'xy' ? '0px' : `${cornerWidth()}px`,
          '--sa-corner-height': local.scrollbars !== 'xy' ? '0px' : `${cornerHeight()}px`,
        }}
      />
    </ScrollAreaProvider>
  );
};

ScrollAreaRoot.displayName = '@empoleon/core/ScrollAreaRoot';
