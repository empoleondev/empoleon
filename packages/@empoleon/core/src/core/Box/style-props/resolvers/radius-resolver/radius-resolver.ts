import { EmpoleonTheme } from '../../../../EmpoleonProvider';
import { rem } from '../../../../utils';

export function radiusResolver(value: unknown, theme: EmpoleonTheme) {
  if (typeof value === 'string' && value in theme.radius) {
    return `var(--mantine-radius-${value})`;
  }

  if (typeof value === 'number') {
    return rem(value);
  }

  if (typeof value === 'string') {
    return rem(value);
  }

  return value;
}
