import { Component, JSX, mergeProps } from 'solid-js';
import type { EmpoleonThemeComponent } from '../EmpoleonProvider';
import type { ClassNames, PartialVarsResolver, Styles } from '../styles-api';

export type DataAttributes = Record<`data-${string}`, any>;

export interface FactoryPayload {
  props: Record<string, any>;
  ctx?: any;
  ref?: any;
  stylesNames?: string;
  vars?: any;
  variant?: string;
  staticComponents?: Record<string, any>;
  // Compound components cannot have classNames, styles and vars on EmpoleonProvider
  compound?: boolean;
}

export interface ExtendCompoundComponent<Payload extends FactoryPayload> {
  defaultProps?: Partial<Payload['props']> & DataAttributes;
}

export interface ExtendsRootComponent<Payload extends FactoryPayload> {
  defaultProps?: Partial<Payload['props']> & DataAttributes;
  classNames?: ClassNames<Payload>;
  styles?: Styles<Payload>;
  vars?: PartialVarsResolver<Payload>;
}

export type ExtendComponent<Payload extends FactoryPayload> = Payload['compound'] extends true
  ? ExtendCompoundComponent<Payload>
  : ExtendsRootComponent<Payload>;

export type StaticComponents<Input> =
  Input extends Record<string, any> ? Input : Record<string, never>;

export interface ThemeExtend<Payload extends FactoryPayload> {
  extend: (input: ExtendComponent<Payload>) => EmpoleonThemeComponent;
}

export type ComponentClasses<Payload extends FactoryPayload> = {
  classes: Payload['stylesNames'] extends string ? Record<string, string> : never;
};

export type EmpoleonComponentStaticProperties<Payload extends FactoryPayload> =
  ThemeExtend<Payload> &
    ComponentClasses<Payload> &
    StaticComponents<Payload['staticComponents']> &
    FactoryComponentWithProps<Payload> & {
      displayName?: string;
    };

export type FactoryComponentWithProps<Payload extends FactoryPayload> = {
  withProps: (props: Partial<Payload['props']>) => Component<
    Payload['props'] & {
      ref?: any;
      component?: any;
      renderRoot?: (props: Record<string, any>) => JSX.Element;
    }
  >;
};

export type EmpoleonComponent<Payload extends FactoryPayload> = Component<
  Payload['props'] & {
    ref?: any;
    component?: any;
    renderRoot?: (props: Record<string, any>) => JSX.Element;
  }
> &
  EmpoleonComponentStaticProperties<Payload>;

export function identity<T>(value: T): T {
  return value;
}

export function getWithProps<T, Props>(Component: T): (props: Partial<Props>) => T {
  const _Component = Component as any;
  return (fixedProps: any) => {
    const Extended = ((props: any) => {
      const mergedProps = mergeProps(fixedProps, props);
      return _Component(mergedProps);
    }) as any;
    Extended.extend = _Component.extend;
    Extended.displayName = `WithProps(${_Component.displayName})`;
    return Extended;
  };
}

export function factory<Payload extends FactoryPayload>(
  ui: (props: Payload['props'] & { ref?: any }) => JSX.Element
) {
  const Component = ui as any;

  Component.extend = identity as any;
  Component.withProps = (fixedProps: any) => {
    const Extended = ((props: any) => {
      const mergedProps = mergeProps(fixedProps, props);
      return Component(mergedProps);
    }) as any;
    Extended.extend = Component.extend;
    Extended.displayName = `WithProps(${Component.displayName})`;
    return Extended;
  };

  return Component as EmpoleonComponent<Payload>;
}
