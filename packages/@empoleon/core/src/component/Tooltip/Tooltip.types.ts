import { JSX } from 'solid-js';
import type { FlipOptions, InlineOptions, ShiftOptions, SizeOptions } from '@empoleon/solid-floating-ui';
import { BoxProps, ElementProps, EmpoleonColor, EmpoleonRadius, StylesApiProps } from '../../core';
import { FloatingPosition } from '../../utils/Floating';
import { PortalProps } from '../Portal';
import type { TooltipFactory } from './Tooltip';


export type TooltipStylesNames = 'tooltip' | 'arrow';
export type TooltipCssVariables = {
  tooltip: '--tooltip-radius' | '--tooltip-bg' | '--tooltip-color';
};

export interface TooltipMiddlewares {
  shift?: boolean | ShiftOptions;
  flip?: boolean | FlipOptions;
  inline?: boolean | InlineOptions;
  size?: boolean | SizeOptions;
}

export interface TooltipBaseProps
  extends BoxProps,
    StylesApiProps<TooltipFactory>,
    Omit<ElementProps<'div'>, 'children'> {
  /** Target element, must support `ref` prop and `...others` */
  children: JSX.Element | ((refProps: Record<string, any>) => JSX.Element);

  /** Tooltip position relative to target element (`Tooltip` component) or mouse (`Tooltip.Floating` component) */
  position?: FloatingPosition;

  /** Key of the prop that can be used to access element ref, `ref` by default */
  refProp?: string;

  /** Tooltip content */
  label: JSX.Element;

  /** Determines whether tooltip should be rendered within `Portal`, `true` by default */
  withinPortal?: boolean;

  /** Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Key of `theme.colors` or any valid CSS color, controls tooltip background, by default set based on current color scheme */
  color?: EmpoleonColor;

  /** Determines whether content should be wrapped on to the next line, `false` by default */
  multiline?: boolean;

  /** Tooltip z-index, `300` by default */
  zIndex?: string | number;

  /** If set, tooltip element will not be rendered */
  disabled?: boolean;

  /** Props to pass down to the portal when withinPortal is true */
  portalProps?: Omit<PortalProps, 'children' | 'withinPortal'>;

  /** Floating ui middlewares to configure position handling, `{ flip: true, shift: true, inline: false }` by default */
  middlewares?: TooltipMiddlewares;
}
