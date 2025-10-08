import { Ref } from '@solid-primitives/refs';
import cx from 'clsx';
import { createMemo, JSX, Show, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { EmpoleonBreakpoint, useEmpoleonSxTransform, useEmpoleonTheme } from '../EmpoleonProvider';
import { createPolymorphicComponent } from '../factory';
import { InlineStyles } from '../InlineStyles';
import { isNumberLike } from '../utils';
import type { CssVarsProp, EmpoleonStyleProp } from './Box.types';
import { getBoxMod } from './get-box-mod/get-box-mod';
import { getBoxStyle } from './get-box-style/get-box-style';
import {
  EmpoleonStyleProps,
  extractStyleProps,
  parseStyleProps,
  STYlE_PROPS_DATA,
} from './style-props';
import { useRandomClassName } from './use-random-classname/use-random-classname';

export type Mod = Record<string, any> | string;
export type BoxMod = Mod | Mod[] | BoxMod[];

export interface BoxProps extends EmpoleonStyleProps {
  /** Class added to the root element, if applicable */
  className?: string;

  /** Inline style added to root component element, can subscribe to theme defined on EmpoleonProvider */
  style?: EmpoleonStyleProp;

  /** CSS variables defined on root component element */
  __vars?: CssVarsProp;

  /** `size` property passed down the HTML element */
  __size?: string;

  /** Breakpoint above which the component is hidden with `display: none` */
  hiddenFrom?: EmpoleonBreakpoint;

  /** Breakpoint below which the component is hidden with `display: none` */
  visibleFrom?: EmpoleonBreakpoint;

  /** Determines whether component should be hidden in light color scheme with `display: none` */
  lightHidden?: boolean;

  /** Determines whether component should be hidden in dark color scheme with `display: none` */
  darkHidden?: boolean;

  /** Element modifiers transformed into `data-` attributes, for example, `{ 'data-size': 'xl' }`, falsy values are removed */
  mod?: BoxMod;
}

export type ElementProps<
  ElementType extends keyof JSX.IntrinsicElements,
  PropsToOmit extends string = never,
> = Omit<JSX.IntrinsicElements[ElementType], 'style' | PropsToOmit>;

export interface BoxComponentProps extends BoxProps {
  /** Variant passed from parent component, sets `data-variant` */
  variant?: string;

  /** Size passed from parent component, sets `data-size` if value is not number like */
  size?: string | number;
}

const _Box = <T extends HTMLElement = HTMLDivElement>(
  props: BoxComponentProps & {
    component?: any;
    className?: string;
    renderRoot?: any;
    ref?: Ref<T>;
    children?: any;
  }
) => {
  const [local, others] = splitProps(props, [
    'component',
    'style',
    '__vars',
    'className',
    'variant',
    'mod',
    'size',
    'hiddenFrom',
    'visibleFrom',
    'lightHidden',
    'darkHidden',
    'renderRoot',
    '__size',
    'ref',
    'children',
  ]);

  const theme = useEmpoleonTheme();
  const Element = () => local.component || 'div';
  // const [_, rest] = splitProps(extractStyleProps(others), ['styleProps']);
  // const extracted = () => extractStyleProps(others);
  // const styleProps = () => extracted().styleProps;
  const [{ rest }, _] = splitProps(extractStyleProps(others), ['rest']);
  const extracted = () => extractStyleProps(others);
  const styleProps = () => extracted().styleProps;

  const useSxTransform = useEmpoleonSxTransform();
  const transformedSx = createMemo(() => useSxTransform?.()?.(styleProps().sx));
  const responsiveClassName = useRandomClassName();

  const forwardedRef = local.ref as Ref<HTMLElement> | undefined;

  const parsedStyleProps = createMemo(() =>
    parseStyleProps({
      styleProps: styleProps(),
      theme,
      data: STYlE_PROPS_DATA,
    })
  );

  const elementProps = createMemo(() => {
    return {
      ref: forwardedRef,
      style: getBoxStyle({
        theme,
        style: local.style,
        vars: local.__vars,
        styleProps: parsedStyleProps().inlineStyles,
      }),
      className: cx(local.className, transformedSx(), {
        [responsiveClassName]: parsedStyleProps().hasResponsiveStyles,
        'empoleon-light-hidden': local.lightHidden,
        'empoleon-dark-hidden': local.darkHidden,
        [`empoleon-hidden-from-${local.hiddenFrom}`]: local.hiddenFrom,
        [`empoleon-visible-from-${local.visibleFrom}`]: local.visibleFrom,
      }),
      'data-variant': local.variant,
      'data-size': isNumberLike(local.size) ? undefined : local.size || undefined,
      size: local.__size,
      ...getBoxMod(local.mod),
      ...rest,
    };
  });

  return (
    <>
      <Show when={parsedStyleProps().hasResponsiveStyles}>
        <InlineStyles
          selector={`.${responsiveClassName}`}
          styles={parsedStyleProps().styles}
          media={parsedStyleProps().media}
        />
      </Show>

      {typeof local.renderRoot === 'function' ? (
        local.renderRoot(elementProps())
      ) : (
        <Dynamic component={Element()} {...elementProps()}>
          {local.children}
        </Dynamic>
      )}
    </>
  );
};

_Box.displayName = '@empoleon/core/Box';

export const Box = createPolymorphicComponent<'div', BoxComponentProps>(_Box);
