import type { LoadingOverlayFactory } from '@empoleon/core';
import type { StylesApiData } from '../types';

export const LoadingOverlayStylesApi: StylesApiData<LoadingOverlayFactory> = {
  selectors: {
    root: 'Root element',
    overlay: '`Overlay` component',
    loader: '`Loader` component',
  },

  vars: {
    root: {
      '--lo-z-index': 'Controls `z-index` of the overlay and loader',
    },
  },
};
