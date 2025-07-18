import { deepMerge } from '../../utils';
import { EmpoleonThemeOverride } from '../theme.types';

export function mergeThemeOverrides(...overrides: EmpoleonThemeOverride[]): EmpoleonThemeOverride {
  return overrides.reduce((acc, override) => deepMerge(acc, override), {});
}
