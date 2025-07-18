import { createSafeContext, GetStylesApi } from '../../core';
import type { TimelineFactory } from './Timeline';

interface TimelineContextValue {
  getStyles: GetStylesApi<TimelineFactory>;
  registerItem: () => number;
  activeIndex: () => number;
  reverseActive: () => boolean;
  align: () => 'left' | 'right';
  unstyled: () => boolean;
}

export const [TimelineProvider, useTimelineContext] = createSafeContext<TimelineContextValue>(
  'Timeline component was not found in tree'
);
