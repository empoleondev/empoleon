import { Accessor } from 'solid-js';
import {
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  InlineStyles,
  keys,
  useEmpoleonTheme,
} from '../../../core';
import { GridBreakpoints, useGridContext } from '../Grid.context';
import type { ColSpan, GridColProps } from './GridCol';

interface GridColVariablesProps {
  selector: string;
  span: GridColProps['span'] | undefined;
  order?: GridColProps['order'] | undefined;
  offset?: GridColProps['offset'] | undefined;
}

const getColumnFlexBasis = (colSpan: ColSpan | undefined, columns: number) => {
  if (colSpan === 'content') {
    return 'auto';
  }

  if (colSpan === 'auto') {
    return '0rem';
  }

  return colSpan ? `${100 / (columns / colSpan)}%` : undefined;
};

const getColumnMaxWidth = (
  colSpan: ColSpan | undefined,
  columns: number,
  grow: boolean | undefined
) => {
  if (grow || colSpan === 'auto') {
    return '100%';
  }

  if (colSpan === 'content') {
    return 'unset';
  }

  return getColumnFlexBasis(colSpan, columns);
};

const getColumnFlexGrow = (colSpan: ColSpan | undefined, grow: boolean | undefined) => {
  if (!colSpan) {
    return undefined;
  }

  return colSpan === 'auto' || grow ? '1' : 'auto';
};

const getColumnOffset = (offset: number | undefined, columns: number) =>
  offset === 0 ? '0' : offset ? `${100 / (columns / offset)}%` : undefined;

export function GridColVariables(props: GridColVariablesProps) {
  const theme = useEmpoleonTheme();
  const ctx = useGridContext();
  const _breakpoints = ctx.breakpoints || theme.breakpoints;

  const baseValue = getBaseValue(props.span);
  const baseSpan = baseValue === undefined ? 12 : getBaseValue(props.span);

  const baseStyles: Accessor<Record<string, string | undefined>> = () =>
    filterProps({
      '--col-order': getBaseValue(props.order)?.toString(),
      '--col-flex-grow': getColumnFlexGrow(baseSpan, ctx.grow),
      '--col-flex-basis': getColumnFlexBasis(baseSpan, ctx.columns),
      '--col-width': baseSpan === 'content' ? 'auto' : undefined,
      '--col-max-width': getColumnMaxWidth(baseSpan, ctx.columns, ctx.grow),
      '--col-offset': getColumnOffset(getBaseValue(props.offset), ctx.columns),
    });

  const queries = keys(_breakpoints).reduce<Record<string, Record<string, any>>>(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }

      if (typeof props.order === 'object' && props.order[breakpoint] !== undefined) {
        acc[breakpoint]['--col-order'] = props.order[breakpoint]?.toString();
      }

      if (typeof props.span === 'object' && props.span[breakpoint] !== undefined) {
        acc[breakpoint]['--col-flex-grow'] = getColumnFlexGrow(props.span[breakpoint], ctx.grow);
        acc[breakpoint]['--col-flex-basis'] = getColumnFlexBasis(
          props.span[breakpoint],
          ctx.columns
        );
        acc[breakpoint]['--col-width'] = props.span[breakpoint] === 'content' ? 'auto' : undefined;
        acc[breakpoint]['--col-max-width'] = getColumnMaxWidth(
          props.span[breakpoint],
          ctx.columns,
          ctx.grow
        );
      }

      if (typeof props.offset === 'object' && props.offset[breakpoint] !== undefined) {
        acc[breakpoint]['--col-offset'] = getColumnOffset(props.offset[breakpoint], ctx.columns);
      }

      return acc;
    },
    {}
  );

  const sortedBreakpoints = getSortedBreakpoints(keys(queries), _breakpoints).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );

  const values = sortedBreakpoints.map((breakpoint) => ({
    query:
      ctx.type === 'container'
        ? `empoleon-grid (min-width: ${_breakpoints[breakpoint.value as keyof GridBreakpoints]})`
        : `(min-width: ${_breakpoints[breakpoint.value as keyof GridBreakpoints]})`,
    styles: queries[breakpoint.value],
  }));

  return (
    <InlineStyles
      styles={baseStyles()}
      media={ctx.type === 'container' ? undefined : values}
      container={ctx.type === 'container' ? values : undefined}
      selector={props.selector}
    />
  );
}
