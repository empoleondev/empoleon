import { createMemo } from 'solid-js';
import {
  EmpoleonBreakpoint,
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  getSpacing,
  InlineStyles,
  keys,
  px,
  rem,
  useEmpoleonTheme,
} from '@empoleon/core';
import type { CarouselProps } from '../Carousel';

interface CarouselVariablesProps extends CarouselProps {
  selector: string;
}

export function CarouselVariables(props: CarouselVariablesProps) {
  const theme = useEmpoleonTheme();

  const baseStyles = createMemo(() =>
    filterProps({
      '--carousel-slide-gap': getSpacing(getBaseValue(props.slideGap)),
      '--carousel-slide-size': rem(getBaseValue(props.slideSize)),
    })
  );

  const queries = createMemo(() =>
    keys(theme.breakpoints).reduce<Record<string, Record<string, any>>>((acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }

      if (typeof props.slideGap === 'object' && props.slideGap[breakpoint] !== undefined) {
        acc[breakpoint]['--carousel-slide-gap'] = getSpacing(props.slideGap[breakpoint]);
      }

      if (typeof props.slideSize === 'object' && props.slideSize[breakpoint] !== undefined) {
        acc[breakpoint]['--carousel-slide-size'] = getSpacing(props.slideSize[breakpoint]);
      }

      return acc;
    }, {})
  );

  const sortedBreakpoints = createMemo(() =>
    getSortedBreakpoints(keys(queries()), theme.breakpoints).filter(
      (breakpoint) => keys(queries()[breakpoint.value]).length > 0
    )
  );

  const media = createMemo(() =>
    sortedBreakpoints().map((breakpoint) => ({
      query: `(min-width: ${theme.breakpoints[breakpoint.value as EmpoleonBreakpoint]})`,
      styles: queries()[breakpoint.value],
    }))
  );

  return <InlineStyles styles={baseStyles()} media={media()} selector={props.selector} />;
}

function getBreakpoints(values: unknown) {
  if (typeof values === 'object' && values !== null) {
    return keys(values);
  }

  return [];
}

function sortBreakpoints(breakpoints: string[]) {
  return breakpoints.sort((a, b) => (px(a) as number) - (px(b) as number));
}

function getUniqueBreakpoints(props: Omit<CarouselVariablesProps, 'selector'>) {
  const breakpoints = Array.from(
    new Set([...getBreakpoints(props.slideGap), ...getBreakpoints(props.slideSize)])
  );

  return sortBreakpoints(breakpoints);
}

export function CarouselContainerVariables(props: CarouselVariablesProps) {
  const baseStyles = createMemo(() =>
    filterProps({
      '--carousel-slide-gap': getSpacing(getBaseValue(props.slideGap)),
      '--carousel-slide-size': rem(getBaseValue(props.slideSize)),
    })
  );

  const queries = createMemo(() =>
    getUniqueBreakpoints({ slideGap: props.slideGap, slideSize: props.slideSize }).reduce<
      Record<string, Record<string, any>>
    >((acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }

      if (typeof props.slideGap === 'object' && props.slideGap[breakpoint] !== undefined) {
        acc[breakpoint]['--carousel-slide-gap'] = getSpacing(props.slideGap[breakpoint]);
      }

      if (typeof props.slideSize === 'object' && props.slideSize[breakpoint] !== undefined) {
        acc[breakpoint]['--carousel-slide-size'] = getSpacing(props.slideSize[breakpoint]);
      }

      return acc;
    }, {})
  );

  const media = createMemo(() =>
    Object.keys(queries()).map((breakpoint) => ({
      query: `carousel (min-width: ${breakpoint})`,
      styles: queries()[breakpoint],
    }))
  );

  return <InlineStyles styles={baseStyles()} container={media()} selector={props.selector} />;
}
