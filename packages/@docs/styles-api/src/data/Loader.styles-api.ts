import type { LoaderFactory } from '@empoleon/core';
import type { StylesApiData } from '../types';

export const LoaderStylesApi: StylesApiData<LoaderFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--loader-size':
        'Controls loader size (usually `width` and `height`, in some cases only `width`)',
      '--loader-color': 'Control loader color',
    },
  },
};
