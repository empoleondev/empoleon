import './baseline.css';
import './global.css';
import './default-css-variables.css';

import { JSX, mergeProps } from 'solid-js';
import { localStorageColorSchemeManager, EmpoleonColorSchemeManager } from './color-scheme-managers';
import { EmpoleonContext, EmpoleonStylesTransform } from './Empoleon.context';
import { EmpoleonClasses } from './EmpoleonClasses';
import { CSSVariablesResolver, EmpoleonCssVariables } from './EmpoleonCssVariables';
import { EmpoleonThemeProvider } from './EmpoleonThemeProvider';
import type { EmpoleonColorScheme, EmpoleonThemeOverride } from './theme.types';
import { useProviderColorScheme } from './use-empoleon-color-scheme';
import { useRespectReduceMotion } from './use-respect-reduce-motion';

export interface EmpoleonProviderProps {
  /** Theme override object */
  theme?: EmpoleonThemeOverride;

  /** Used to retrieve/set color scheme value in external storage, by default uses `window.localStorage` */
  colorSchemeManager?: EmpoleonColorSchemeManager;

  /** Default color scheme value used when `colorSchemeManager` cannot retrieve value from external storage, `light` by default */
  defaultColorScheme?: EmpoleonColorScheme;

  /** Forces color scheme value, if set, EmpoleonProvider ignores `colorSchemeManager` and `defaultColorScheme` */
  forceColorScheme?: 'light' | 'dark';

  /** CSS selector to which CSS variables should be added, `:root` by default */
  cssVariablesSelector?: string;

  /** Determines whether theme CSS variables should be added to given `cssVariablesSelector`, `true` by default */
  withCssVariables?: boolean;

  /** Determines whether CSS variables should be deduplicated: if CSS variable has the same value as in default theme, it is not added in the runtime. `true` by default. */
  deduplicateCssVariables?: boolean;

  /** Function to resolve root element to set `data-empoleon-color-scheme` attribute, must return undefined on server, `() => document.documentElement` by default */
  getRootElement?: () => HTMLElement | undefined;

  /** A prefix for components static classes (for example {selector}-Text-root), `empoleon` by default */
  classNamesPrefix?: string;

  /** Function to generate nonce attribute added to all generated `<style />` tags */
  getStyleNonce?: () => string;

  /** Function to generate CSS variables based on theme object */
  cssVariablesResolver?: CSSVariablesResolver;

  /** Determines whether components should have static classes, for example, `empoleon-Button-root`. `true` by default */
  withStaticClasses?: boolean;

  /** Determines whether global classes should be added with `<style />` tag. Global classes are required for `hiddenFrom`/`visibleFrom` and `lightHidden`/`darkHidden` props to work. `true` by default. */
  withGlobalClasses?: boolean;

  /** An object to transform `styles` and `sx` props into css classes, can be used with CSS-in-JS libraries */
  stylesTransform?: EmpoleonStylesTransform;

  /** Your application */
  children?: JSX.Element;

  /** Environment at which the provider is used, `'test'` environment disables all transitions and portals */
  env?: 'default' | 'test';
}

export function EmpoleonProvider(_props: EmpoleonProviderProps) {
  const props = mergeProps({
    withCssVariables: true,
    withGlobalClasses: true,
    deduplicateCssVariables: true,
    withStaticClasses: true,
    classNamesPrefix: 'empoleon',
    colorSchemeManager: localStorageColorSchemeManager(),
    defaultColorScheme: 'light' as const,
    cssVariablesSelector: ':root',
    getRootElement: () => document.documentElement,
  }, _props);

  const colorSchemeProps = useProviderColorScheme({
    defaultColorScheme: props.defaultColorScheme,
    forceColorScheme: props.forceColorScheme,
    manager: props.colorSchemeManager,
    getRootElement: props.getRootElement,
  });

  useRespectReduceMotion({
    respectReducedMotion: props.theme?.respectReducedMotion || false,
    getRootElement: props.getRootElement,
  });

  return (
    <EmpoleonContext.Provider
      value={{
        colorScheme: colorSchemeProps.colorScheme,
        setColorScheme: colorSchemeProps.setColorScheme,
        clearColorScheme: colorSchemeProps.clearColorScheme,
        getRootElement: props.getRootElement,
        classNamesPrefix: props.classNamesPrefix,
        getStyleNonce: props.getStyleNonce,
        cssVariablesResolver: props.cssVariablesResolver,
        cssVariablesSelector: props.cssVariablesSelector,
        withStaticClasses: props.withStaticClasses,
        stylesTransform: props.stylesTransform,
        env: props.env,
      }}
    >
      <EmpoleonThemeProvider theme={props.theme}>
        {props.withCssVariables && (
          <EmpoleonCssVariables
            cssVariablesSelector={props.cssVariablesSelector}
            deduplicateCssVariables={props.deduplicateCssVariables}
          />
        )}
        {props.withGlobalClasses && <EmpoleonClasses />}
        {props.children}
      </EmpoleonThemeProvider>
    </EmpoleonContext.Provider>
  );
}

EmpoleonProvider.displayName = '@empoleon/core/EmpoleonProvider';

export interface HeadlessEmpoleonProviderProps {
  /** Theme override object */
  theme?: EmpoleonThemeOverride;

  /** Your application */
  children?: JSX.Element;
}

export function HeadlessEmpoleonProvider({ children, theme }: HeadlessEmpoleonProviderProps) {
  return (
    <EmpoleonContext.Provider
      value={{
        colorScheme: 'auto',
        setColorScheme: () => {},
        clearColorScheme: () => {},
        getRootElement: () => document.documentElement,
        classNamesPrefix: 'empoleon',
        cssVariablesSelector: ':root',
        withStaticClasses: false,
        headless: true,
      }}
    >
      <EmpoleonThemeProvider theme={theme}>{children}</EmpoleonThemeProvider>
    </EmpoleonContext.Provider>
  );
}

HeadlessEmpoleonProvider.displayName = '@empoleon/core/HeadlessEmpoleonProvider';
