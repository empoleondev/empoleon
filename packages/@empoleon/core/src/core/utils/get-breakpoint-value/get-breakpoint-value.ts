import type { EmpoleonBreakpoint } from '../../EmpoleonProvider';
import { px } from '../units-converters';

export type BreakpointsSource = Record<EmpoleonBreakpoint, number | string>;

export function getBreakpointValue(breakpoint: number | string, breakpoints: BreakpointsSource) {
  if (breakpoint in breakpoints) {
    return px(breakpoints[breakpoint as EmpoleonBreakpoint]) as number;
  }

  return px(breakpoint) as number;
}
