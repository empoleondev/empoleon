import type { EmpoleonColorScheme } from '../theme.types';

export interface EmpoleonColorSchemeManager {
  /** Function to retrieve color scheme value from external storage, for example window.localStorage */
  get: (defaultValue: EmpoleonColorScheme) => EmpoleonColorScheme;

  /** Function to set color scheme value in external storage, for example window.localStorage */
  set: (value: EmpoleonColorScheme) => void;

  /** Function to subscribe to color scheme changes triggered by external events */
  subscribe: (onUpdate: (colorScheme: EmpoleonColorScheme) => void) => void;

  /** Function to unsubscribe from color scheme changes triggered by external events */
  unsubscribe: () => void;

  /** Function to clear value from external storage */
  clear: () => void;
}
