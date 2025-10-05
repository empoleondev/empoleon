import { Accessor, createMemo } from 'solid-js';
import {
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  getSpacing,
  InlineStyles,
  keys,
  useEmpoleonTheme,
} from '../../core';
import type { GridProps } from './Grid';
import type { GridBreakpoints } from './Grid.context';

interface GridVariablesProps extends GridProps {
  selector: string;
}

export function GridVariables(props: GridVariablesProps) {
  const theme = useEmpoleonTheme();
  const _breakpoints = props.breakpoints || theme.breakpoints;

  const baseStyles: Accessor<Record<string, string | undefined>> = createMemo(() => filterProps({
    '--grid-gutter': getSpacing(getBaseValue(props.gutter)),
  }));

  const queries = () => keys(_breakpoints).reduce<Record<string, Record<string, any>>>(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }

      if (typeof props.gutter === 'object' && props.gutter[breakpoint] !== undefined) {
        acc[breakpoint]['--grid-gutter'] = getSpacing(props.gutter[breakpoint]);
      }

      return acc;
    },
    {}
  );

  const sortedBreakpoints = getSortedBreakpoints(keys(queries), _breakpoints).filter(
    (breakpoint) => keys(queries()[breakpoint.value]).length > 0
  );

  const values = sortedBreakpoints.map((breakpoint) => ({
    query:
      props.type === 'container'
        ? `empoleon-grid (min-width: ${_breakpoints[breakpoint.value as keyof GridBreakpoints]})`
        : `(min-width: ${_breakpoints[breakpoint.value as keyof GridBreakpoints]})`,
    styles: queries()[breakpoint.value],
  }));

  return (
    <InlineStyles
      styles={baseStyles()}
      media={props.type === 'container' ? undefined : values}
      container={props.type === 'container' ? values : undefined}
      selector={props.selector}
    />
  );
}
