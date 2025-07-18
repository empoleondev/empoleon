import { JSX } from 'solid-js';
import type { PartialDeep } from 'type-fest';
import { VariantColorsResolver } from './color-functions';

export interface EmpoleonTheme {
  /** Controls focus ring styles. Supports the following options:
   *  - `auto` – focus ring is displayed only when the user navigates with keyboard (default value)
   *  - `always` – focus ring is displayed when the user navigates with keyboard and mouse
   *  - `never` – focus ring is always hidden (not recommended)
   */
  focusRing: 'auto' | 'always' | 'never';

  /** Rem units scale, change if you customize font-size of `<html />` element
   *  default value is `1` (for `100%`/`16px` font-size on `<html />`)
   */
  scale: number;

  /** Determines whether `font-smoothing` property should be set on the body, `true` by default */
  fontSmoothing: boolean;

  /** White color */
  white: string;

  /** Black color */
  black: string;

  /** Object of colors, key is color name, value is an array of at least 10 strings (colors) */
  colors: EmpoleonThemeColors;

  /** Index of theme.colors[color].
   *  Primary shade is used in all components to determine which color from theme.colors[color] should be used.
   *  Can be either a number (0–9) or an object to specify different color shades for light and dark color schemes.
   *  Default value `{ light: 6, dark: 8 }`
   *
   *  For example,
   *  { primaryShade: 6 } // shade 6 is used both for dark and light color schemes
   *  { primaryShade: { light: 6, dark: 7 } } // different shades for dark and light color schemes
   * */
  primaryShade: EmpoleonColorShade | EmpoleonPrimaryShade;

  /** Key of `theme.colors`, hex/rgb/hsl values are not supported.
   *  Determines which color will be used in all components by default.
   *  Default value – `blue`.
   * */
  primaryColor: string;

  /** Function to resolve colors based on variant.
   *  Can be used to deeply customize how colors are applied to `Button`, `ActionIcon`, `ThemeIcon`
   *  and other components that use colors from theme.
   * */
  variantColorResolver: VariantColorsResolver;

  /** Determines whether text color must be changed based on the given `color` prop in filled variant
   *  For example, if you pass `color="blue.1"` to Button component, text color will be changed to `var(--empoleon-color-black)`
   *  Default value – `false`
   * */
  autoContrast: boolean;

  /** Determines which luminance value is used to determine if text color should be light or dark.
   *  Used only if `theme.autoContrast` is set to `true`.
   *  Default value is `0.3`
   * */
  luminanceThreshold: number;

  /** Font-family used in all components, system fonts by default */
  fontFamily: string;

  /** Monospace font-family, used in code and other similar components, system fonts by default  */
  fontFamilyMonospace: string;

  /** Controls various styles of h1-h6 elements, used in TypographyStylesProvider and Title components */
  headings: {
    fontFamily: string;
    fontWeight: string;
    textWrap: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable';
    sizes: {
      h1: HeadingStyle;
      h2: HeadingStyle;
      h3: HeadingStyle;
      h4: HeadingStyle;
      h5: HeadingStyle;
      h6: HeadingStyle;
    };
  };

  /** Object of values that are used to set `border-radius` in all components that support it */
  radius: EmpoleonRadiusValues;

  /** Key of `theme.radius` or any valid CSS value. Default `border-radius` used by most components */
  defaultRadius: EmpoleonRadius;

  /** Object of values that are used to set various CSS properties that control spacing between elements */
  spacing: EmpoleonSpacingValues;

  /** Object of values that are used to control `font-size` property in all components */
  fontSizes: EmpoleonFontSizesValues;

  /** Object of values that are used to control `line-height` property in `Text` component */
  lineHeights: EmpoleonLineHeightValues;

  /** Object of values that are used to control breakpoints in all components,
   *  values are expected to be defined in em
   * */
  breakpoints: EmpoleonBreakpointsValues;

  /** Object of values that are used to add `box-shadow` styles to components that support `shadow` prop */
  shadows: EmpoleonShadowsValues;

  /** Determines whether user OS settings to reduce motion should be respected, `false` by default */
  respectReducedMotion: boolean;

  /** Determines which cursor type will be used for interactive elements
   * - `default` – cursor that is used by native HTML elements, for example, `input[type="checkbox"]` has `cursor: default` styles
   * - `pointer` – sets `cursor: pointer` on interactive elements that do not have these styles by default
   */
  cursorType: 'default' | 'pointer';

  /** Default gradient configuration for components that support `variant="gradient"` */
  defaultGradient: EmpoleonGradient;

  /** Class added to the elements that have active styles, for example, `Button` and `ActionIcon` */
  activeClassName: string;

  /** Class added to the elements that have focus styles, for example, `Button` or `ActionIcon`.
   *  Overrides `theme.focusRing` property.
   */
  focusClassName: string;

  /** Allows adding `classNames`, `styles` and `defaultProps` to any component */
  components: EmpoleonThemeComponents;

  /** Any other properties that you want to access with the theme objects */
  other: EmpoleonThemeOther;
}

export type EmpoleonColorScheme = 'light' | 'dark' | 'auto';

export type EmpoleonThemeOverride = PartialDeep<EmpoleonTheme>;

export type EmpoleonStylesRecord = Record<string, JSX.CSSProperties>;

export interface EmpoleonThemeComponent {
  classNames?: any;
  styles?: any;
  vars?: any;
  defaultProps?: any;
}

export type EmpoleonThemeComponents = Record<string, EmpoleonThemeComponent>;

export interface HeadingStyle {
  fontSize: string;
  fontWeight?: string;
  lineHeight: string;
}

export type EmpoleonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DefaultEmpoleonSize = EmpoleonSize;
export interface EmpoleonThemeSizesOverride {}

export type EmpoleonBreakpoint =
  | (EmpoleonThemeSizesOverride extends {
      breakpoints: Record<infer CustomBreakpoints, string>;
    }
      ? CustomBreakpoints
      : EmpoleonSize)
  | (string & {});
export type EmpoleonBreakpointsValues = Record<EmpoleonBreakpoint, string>;

export type EmpoleonFontSize =
  | (EmpoleonThemeSizesOverride extends {
      fontSizes: Record<infer CustomFontSizes, string>;
    }
      ? CustomFontSizes
      : EmpoleonSize)
  | (string & {});
export type EmpoleonFontSizesValues = Record<EmpoleonFontSize, string>;

type _EmpoleonRadius =
  | (EmpoleonThemeSizesOverride extends {
      radius: Record<infer CustomRadius, string>;
    }
      ? CustomRadius
      : EmpoleonSize)
  | (string & {});
export type EmpoleonRadius = _EmpoleonRadius | number;
export type EmpoleonRadiusValues = Record<_EmpoleonRadius, string>;

type _EmpoleonSpacing =
  | (EmpoleonThemeSizesOverride extends {
      spacing: Record<infer CustomSpacing, string>;
    }
      ? CustomSpacing
      : EmpoleonSize)
  | (string & {});
export type EmpoleonSpacing = _EmpoleonSpacing | number;
export type EmpoleonSpacingValues = Record<EmpoleonSpacing, string>;

export type EmpoleonShadow =
  | (EmpoleonThemeSizesOverride extends {
      shadows: Record<infer CustomShadow, string>;
    }
      ? CustomShadow
      : EmpoleonSize)
  | (string & {});
export type EmpoleonShadowsValues = Record<EmpoleonShadow, string>;

export type EmpoleonLineHeight =
  | (EmpoleonThemeSizesOverride extends {
      lineHeights: Record<infer CustomLineHeight, string>;
    }
      ? CustomLineHeight
      : EmpoleonSize)
  | (string & {});
export type EmpoleonLineHeightValues = Record<EmpoleonLineHeight, string>;

export interface EmpoleonThemeOther {
  [key: string]: any;
}

export interface EmpoleonGradient {
  from: string;
  to: string;
  deg?: number;
}

export type EmpoleonColorsTuple = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  ...string[],
];

export type EmpoleonColorShade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface EmpoleonPrimaryShade {
  light: EmpoleonColorShade;
  dark: EmpoleonColorShade;
}

export type DefaultEmpoleonColor =
  | 'dark'
  | 'gray'
  | 'red'
  | 'pink'
  | 'grape'
  | 'violet'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'orange'
  | 'teal'
  | (string & {});

export interface EmpoleonThemeColorsOverride {}

export type EmpoleonThemeColors = EmpoleonThemeColorsOverride extends {
  colors: Record<infer CustomColors, EmpoleonColorsTuple>;
}
  ? Record<CustomColors, EmpoleonColorsTuple>
  : Record<DefaultEmpoleonColor, EmpoleonColorsTuple>;

export type EmpoleonColor = keyof EmpoleonThemeColors;
