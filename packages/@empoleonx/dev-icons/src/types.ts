import type { BoxProps, ElementProps } from '@empoleon/core';

export interface DevIconProps extends BoxProps, ElementProps<'svg', 'display' | 'opacity'> {
  size?: number;
}
