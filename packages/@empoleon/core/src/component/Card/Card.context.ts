// import { Accessor } from 'solid-js';
// import { createSafeContext, GetStylesApi } from '../../core';
// import type { CardFactory } from './Card';

// interface CardContextValue {
//   getStyles: GetStylesApi<CardFactory>;
//   registerItem: Accessor<number>;
//   totalItems: Accessor<number>;
// }

// export const [CardProvider, useCardContext] = createSafeContext<CardContextValue>(
//   'Card component was not found in tree'
// );

// working all in one
import { createSafeContext, GetStylesApi } from '../../core';
import type { CardFactory } from './Card';

interface CardContextValue {
  getStyles: GetStylesApi<CardFactory>;
  registerSection: () => number;
  getTotalSections: () => number;
  onSectionsChange: (callback: () => void) => () => void;
}

export const [CardProvider, useCardContext] = createSafeContext<CardContextValue>(
  'Card component was not found in tree'
);
