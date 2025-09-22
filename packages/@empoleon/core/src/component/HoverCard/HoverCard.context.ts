import { Accessor } from 'solid-js';
import { createSafeContext } from '../../core';

interface HoverCardContext {
  openDropdown: () => void;
  closeDropdown: () => void;
  getReferenceProps?: () => any;
  getFloatingProps?: () => any;
  reference?: (node: HTMLElement | null) => void;
  floating?: (node: HTMLElement | null) => void;
  x?: Accessor<number | null>;
  y?: Accessor<number | null>;
}

export const [HoverCardContextProvider, useHoverCardContext] = createSafeContext<HoverCardContext>(
  'HoverCard component was not found in the tree'
);
