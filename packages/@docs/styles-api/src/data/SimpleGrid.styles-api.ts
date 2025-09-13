import type { SimpleGridFactory } from '@empoleon/core';
import type { StylesApiData } from '../types';

export const SimpleGridStylesApi: StylesApiData<SimpleGridFactory> = {
  selectors: {
    root: 'Root element',
    container: 'Container element, available only when `type="container"` is set',
  },

  vars: {},
};
