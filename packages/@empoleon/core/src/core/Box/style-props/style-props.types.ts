import { JSX } from 'solid-js';
import type {
  EmpoleonBreakpoint,
  EmpoleonColor,
  EmpoleonFontSize,
  EmpoleonLineHeight,
  EmpoleonSpacing,
} from '../../EmpoleonProvider';

export type StyleProp<Value> = Value | Partial<Record<EmpoleonBreakpoint | (string & {}), Value>>;

export interface EmpoleonStyleProps {
  /** Margin, theme key: theme.spacing */
  m?: StyleProp<EmpoleonSpacing>;
  /** MarginBlock, theme key: theme.spacing */
  my?: StyleProp<EmpoleonSpacing>;
  /** MarginInline, theme key: theme.spacing */
  mx?: StyleProp<EmpoleonSpacing>;
  /** MarginTop, theme key: theme.spacing */
  mt?: StyleProp<EmpoleonSpacing>;
  /** MarginBottom, theme key: theme.spacing */
  mb?: StyleProp<EmpoleonSpacing>;
  /** MarginInlineStart, theme key: theme.spacing */
  ms?: StyleProp<EmpoleonSpacing>;
  /** MarginInlineEnd, theme key: theme.spacing */
  me?: StyleProp<EmpoleonSpacing>;
  /** MarginLeft, theme key: theme.spacing */
  ml?: StyleProp<EmpoleonSpacing>;
  /** MarginRight, theme key: theme.spacing */
  mr?: StyleProp<EmpoleonSpacing>;
  /** Padding, theme key: theme.spacing */

  p?: StyleProp<EmpoleonSpacing>;
  /** PaddingBlock, theme key: theme.spacing */
  py?: StyleProp<EmpoleonSpacing>;
  /** PaddingInline, theme key: theme.spacing */
  px?: StyleProp<EmpoleonSpacing>;
  /** PaddingTop, theme key: theme.spacing */
  pt?: StyleProp<EmpoleonSpacing>;
  /** PaddingBottom, theme key: theme.spacing */
  pb?: StyleProp<EmpoleonSpacing>;
  /** PaddingInlineStart, theme key: theme.spacing */
  ps?: StyleProp<EmpoleonSpacing>;
  /** PaddingInlineEnd, theme key: theme.spacing */
  pe?: StyleProp<EmpoleonSpacing>;
  /** PaddingLeft, theme key: theme.spacing */
  pl?: StyleProp<EmpoleonSpacing>;
  /** PaddingRight, theme key: theme.spacing */
  pr?: StyleProp<EmpoleonSpacing>;

  /** Border */
  bd?: StyleProp<JSX.CSSProperties['border']>;
  /** Background, theme key: theme.colors */
  bg?: StyleProp<EmpoleonColor>;
  /** Color */
  c?: StyleProp<EmpoleonColor>;
  opacity?: StyleProp<JSX.CSSProperties['opacity']>;

  /** FontFamily */
  ff?: StyleProp<'monospace' | 'text' | 'heading' | (string & {})>;
  /** FontSize, theme key: theme.fontSizes */
  fz?: StyleProp<EmpoleonFontSize | `h${1 | 2 | 3 | 4 | 5 | 6}` | number | (string & {})>;
  /** FontWeight */
  fw?: StyleProp<JSX.CSSProperties['font-weight']>;
  /** LetterSpacing */
  lts?: StyleProp<JSX.CSSProperties['letter-spacing']>;
  /** TextAlign */
  ta?: StyleProp<JSX.CSSProperties['text-align']>;
  /** LineHeight, theme key: lineHeights */
  lh?: StyleProp<EmpoleonLineHeight | `h${1 | 2 | 3 | 4 | 5 | 6}` | number | (string & {})>;
  /** FontStyle */
  fs?: StyleProp<JSX.CSSProperties['font-style']>;
  /** TextTransform */
  tt?: StyleProp<JSX.CSSProperties['text-transform']>;
  /** TextDecoration */
  td?: StyleProp<JSX.CSSProperties['text-decoration']>;

  /** Width, theme key: theme.spacing */
  w?: StyleProp<JSX.CSSProperties['width'] | number>;
  /** MinWidth, theme key: theme.spacing*/
  miw?: StyleProp<JSX.CSSProperties['min-width'] | number>;
  /** MaxWidth, theme key: theme.spacing */
  maw?: StyleProp<JSX.CSSProperties['max-width'] | number>;
  /** Height, theme key: theme.spacing */
  h?: StyleProp<JSX.CSSProperties['height'] | number>;
  /** MinHeight, theme key: theme.spacing */
  mih?: StyleProp<JSX.CSSProperties['min-height'] | number>;
  /** MaxHeight, theme key: theme.spacing */
  mah?: StyleProp<JSX.CSSProperties['max-height'] | number>;

  /** BackgroundSize */
  bgsz?: StyleProp<JSX.CSSProperties['background-size']>;
  /** BackgroundPosition */
  bgp?: StyleProp<JSX.CSSProperties['background-position']>;
  /** BackgroundRepeat */
  bgr?: StyleProp<JSX.CSSProperties['background-repeat']>;
  /** BackgroundAttachment */
  bga?: StyleProp<JSX.CSSProperties['background-attachment']>;

  /** Position */
  pos?: StyleProp<JSX.CSSProperties['position']>;
  top?: StyleProp<JSX.CSSProperties['top'] | number>;
  left?: StyleProp<JSX.CSSProperties['left'] | number>;
  bottom?: StyleProp<JSX.CSSProperties['bottom'] | number>;
  right?: StyleProp<JSX.CSSProperties['right'] | number>;
  inset?: StyleProp<JSX.CSSProperties['inset'] | number>;

  display?: StyleProp<JSX.CSSProperties['display']>;
  flex?: StyleProp<JSX.CSSProperties['flex']>;
}
