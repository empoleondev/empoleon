import { colorsTuple } from '../../color-functions';
import { EmpoleonColor, EmpoleonColorsTuple } from '../../theme.types';

interface VirtualColorInput {
  dark: EmpoleonColor;
  light: EmpoleonColor;
  name: string;
}

type VirtualColor = EmpoleonColorsTuple & {
  'empoleon-virtual-color': true;
  name: string;
  dark: EmpoleonColor;
  light: EmpoleonColor;
};

export function virtualColor(input: VirtualColorInput): EmpoleonColorsTuple {
  const result = colorsTuple(
    Array.from({ length: 10 }).map((_, i) => `var(--empoleon-color-${input.name}-${i})`)
  );

  Object.defineProperty(result, 'empoleon-virtual-color', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: true,
  });

  Object.defineProperty(result, 'dark', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: input.dark,
  });

  Object.defineProperty(result, 'light', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: input.light,
  });

  Object.defineProperty(result, 'name', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: input.name,
  });

  return result;
}

export function isVirtualColor(value: unknown): value is VirtualColor {
  return !!value && typeof value === 'object' && 'empoleon-virtual-color' in value;
}
