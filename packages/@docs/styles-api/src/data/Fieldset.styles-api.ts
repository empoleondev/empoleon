import type { FieldsetFactory } from '@empoleon/core';
import type { StylesApiData } from '../types';

export const FieldsetStylesApi: StylesApiData<FieldsetFactory> = {
  selectors: {
    root: 'Root element',
    legend: 'Legend element',
  },

  vars: {
    root: {
      '--fieldset-radius': 'Controls `border-radius`',
    },
  },
};
