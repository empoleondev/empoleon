import { isEmpoleonColorScheme } from './is-empoleon-color-scheme';
import type { EmpoleonColorSchemeManager } from './types';

export interface LocalStorageColorSchemeManagerOptions {
  /** Local storage key used to retrieve value with `localStorage.getItem(key)`, `empoleon-color-scheme-value` by default */
  key?: string;
}

export function localStorageColorSchemeManager({
  key = 'empoleon-color-scheme-value',
}: LocalStorageColorSchemeManagerOptions = {}): EmpoleonColorSchemeManager {
  let handleStorageEvent: (event: StorageEvent) => void;

  return {
    get: (defaultValue) => {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      try {
        const storedColorScheme = window.localStorage.getItem(key);
        return isEmpoleonColorScheme(storedColorScheme) ? storedColorScheme : defaultValue;
      } catch {
        return defaultValue;
      }
    },

    set: (value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
          '[@empoleon/core] Local storage color scheme manager was unable to save color scheme.',
          error
        );
      }
    },

    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          isEmpoleonColorScheme(event.newValue) && onUpdate(event.newValue);
        }
      };

      window.addEventListener('storage', handleStorageEvent);
    },

    unsubscribe: () => {
      window.removeEventListener('storage', handleStorageEvent);
    },

    clear: () => {
      window.localStorage.removeItem(key);
    },
  };
}
