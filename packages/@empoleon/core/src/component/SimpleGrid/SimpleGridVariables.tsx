import { Accessor } from 'solid-js';
import {
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  getSpacing,
  InlineStyles,
  keys,
  EmpoleonBreakpoint,
  px,
  useEmpoleonTheme,
} from '../../core';
import type { SimpleGridProps } from './SimpleGrid';

interface SimpleGridVariablesProps extends SimpleGridProps {
  selector: string;
}

export function SimpleGridMediaVariables(props: SimpleGridVariablesProps) {
  const theme = useEmpoleonTheme();
  const _verticalSpacing = () => props.verticalSpacing === undefined ? props.spacing : props.verticalSpacing;

  const baseStyles: Accessor<Record<string, string | undefined>> = () => filterProps({
    '--sg-spacing-x': getSpacing(getBaseValue(props.spacing)),
    '--sg-spacing-y': getSpacing(getBaseValue(_verticalSpacing())),
    '--sg-cols': getBaseValue(props.cols)?.toString(),
  });

  const queries = keys(theme.breakpoints).reduce<Record<string, Record<string, any>>>(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }

      if (typeof props.spacing === 'object' && props.spacing[breakpoint] !== undefined) {
        acc[breakpoint]['--sg-spacing-x'] = getSpacing(props.spacing[breakpoint]);
      }

      if (typeof _verticalSpacing === 'object' && _verticalSpacing[breakpoint] !== undefined) {
        acc[breakpoint]['--sg-spacing-y'] = getSpacing(_verticalSpacing[breakpoint]);
      }

      if (typeof props.cols === 'object' && props.cols[breakpoint] !== undefined) {
        acc[breakpoint]['--sg-cols'] = props.cols[breakpoint];
      }

      return acc;
    },
    {}
  );

  const sortedBreakpoints = getSortedBreakpoints(keys(queries), theme.breakpoints).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );

  const media = sortedBreakpoints.map((breakpoint) => ({
    query: `(min-width: ${theme.breakpoints[breakpoint.value as EmpoleonBreakpoint]})`,
    styles: queries[breakpoint.value],
  }));

  return <InlineStyles styles={baseStyles()} media={media} selector={props.selector} />;
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

function getUniqueBreakpoints(props: Omit<SimpleGridVariablesProps, 'selector'>) {
  const breakpoints = Array.from(
    new Set([
      ...getBreakpoints(props.spacing),
      ...getBreakpoints(props.verticalSpacing),
      ...getBreakpoints(props.cols),
    ])
  );

  return sortBreakpoints(breakpoints);
}

export function SimpleGridContainerVariables(props: SimpleGridVariablesProps) {
  const _verticalSpacing = () => props.verticalSpacing === undefined ? props.spacing : props.verticalSpacing;

  const baseStyles: Accessor<Record<string, string | undefined>> = () => filterProps({
    '--sg-spacing-x': getSpacing(getBaseValue(props.spacing)),
    '--sg-spacing-y': getSpacing(getBaseValue(_verticalSpacing())),
    '--sg-cols': getBaseValue(props.cols)?.toString(),
  });

  const uniqueBreakpoints = getUniqueBreakpoints({ spacing: props.spacing, verticalSpacing: props.verticalSpacing, cols: props.cols });

  const queries = uniqueBreakpoints.reduce<Record<string, Record<string, any>>>(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }

      if (typeof props.spacing === 'object' && props.spacing[breakpoint] !== undefined) {
        acc[breakpoint]['--sg-spacing-x'] = getSpacing(props.spacing[breakpoint]);
      }

      if (typeof _verticalSpacing === 'object' && _verticalSpacing[breakpoint] !== undefined) {
        acc[breakpoint]['--sg-spacing-y'] = getSpacing(_verticalSpacing[breakpoint]);
      }

      if (typeof props.cols === 'object' && props.cols[breakpoint] !== undefined) {
        acc[breakpoint]['--sg-cols'] = props.cols[breakpoint];
      }

      return acc;
    },
    {}
  );

  const media = uniqueBreakpoints.map((breakpoint) => ({
    query: `simple-grid (min-width: ${breakpoint})`,
    styles: queries[breakpoint],
  }));

  return <InlineStyles styles={baseStyles()} container={media} selector={props.selector} />;
}
