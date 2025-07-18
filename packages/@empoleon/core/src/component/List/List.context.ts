import { JSX } from 'solid-js';
import { createSafeContext, GetStylesApi } from '../../core';
import type { ListFactory } from './List';

interface ListContextValue {
  getStyles: GetStylesApi<ListFactory>;
  center: boolean | undefined;
  icon: JSX.Element | undefined;
}

export const [ListProvider, useListContext] = createSafeContext<ListContextValue>(
  'List component was not found in tree'
);
