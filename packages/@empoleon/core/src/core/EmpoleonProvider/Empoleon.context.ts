import { createContext, useContext } from 'solid-js';
import { ConvertCSSVariablesInput } from './convert-css-variables';
import type { EmpoleonColorScheme, EmpoleonTheme } from './theme.types';

export interface EmpoleonStylesTransform {
  sx?: () => (sx: any) => string;
  styles?: () => (styles: any, payload: any) => Record<string, string>;
}

interface EmpoleonContextValue {
  colorScheme: EmpoleonColorScheme;
  setColorScheme: (colorScheme: EmpoleonColorScheme) => void;
  clearColorScheme: () => void;
  getRootElement: () => HTMLElement | undefined;
  classNamesPrefix: string;
  getStyleNonce?: () => string | undefined;
  cssVariablesResolver?: (theme: EmpoleonTheme) => ConvertCSSVariablesInput;
  cssVariablesSelector: string;
  withStaticClasses: boolean;
  headless?: boolean;
  stylesTransform?: EmpoleonStylesTransform;
  env?: 'default' | 'test';
}

export const EmpoleonContext = createContext<EmpoleonContextValue | null>(null);

export function useEmpoleonContext() {
  const ctx = useContext(EmpoleonContext);

  if (!ctx) {
    throw new Error('[@empoleon/core] EmpoleonProvider was not found in tree');
  }

  return ctx;
}

export function useEmpoleonCssVariablesResolver() {
  return useEmpoleonContext().cssVariablesResolver;
}

export function useEmpoleonClassNamesPrefix() {
  return useEmpoleonContext().classNamesPrefix;
}

export function useEmpoleonStyleNonce() {
  return useEmpoleonContext().getStyleNonce;
}

export function useEmpoleonWithStaticClasses() {
  return useEmpoleonContext().withStaticClasses;
}

export function useEmpoleonIsHeadless() {
  return useEmpoleonContext().headless;
}

export function useEmpoleonSxTransform() {
  return useEmpoleonContext().stylesTransform?.sx;
}

export function useEmpoleonStylesTransform() {
  return useEmpoleonContext().stylesTransform?.styles;
}

export function useEmpoleonEnv() {
  return useEmpoleonContext().env || 'default';
}
