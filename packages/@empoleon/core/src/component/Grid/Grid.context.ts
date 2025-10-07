import { createSafeContext, EmpoleonSize, GetStylesApi } from '../../core';
import type { GridFactory } from './Grid';

export type GridBreakpoints = Record<EmpoleonSize, string>;

interface GridContextValue {
  getStyles: GetStylesApi<GridFactory>;
  grow: boolean | undefined;
  columns: number;
  breakpoints: GridBreakpoints | undefined;
  type: 'container' | 'media' | undefined;
}

export const [GridProvider, useGridContext] = createSafeContext<GridContextValue>(
  'Grid component was not found in tree'
);
