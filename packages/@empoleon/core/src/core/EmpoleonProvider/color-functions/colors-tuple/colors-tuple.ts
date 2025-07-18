import { EmpoleonColorsTuple } from '../../theme.types';

export function colorsTuple(input: string | string[]): EmpoleonColorsTuple {
  if (Array.isArray(input)) {
    return input as unknown as EmpoleonColorsTuple;
  }

  return Array(10).fill(input) as unknown as EmpoleonColorsTuple;
}
