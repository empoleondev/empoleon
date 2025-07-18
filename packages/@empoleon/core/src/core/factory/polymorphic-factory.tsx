import { Component, JSX, mergeProps } from 'solid-js';
import { PolymorphicComponentProps } from './create-polymorphic-component';
import {
  ComponentClasses,
  FactoryPayload,
  identity,
  StaticComponents,
  ThemeExtend,
} from './factory';

export interface PolymorphicFactoryPayload extends FactoryPayload {
  defaultComponent: any;
  defaultRef: any;
}

export type PolymorphicComponentWithProps<Payload extends PolymorphicFactoryPayload> = {
  withProps: <C = Payload['defaultComponent']>(
    fixedProps: PolymorphicComponentProps<C, Payload['props']>
  ) => <L = C>(props: PolymorphicComponentProps<L, Payload['props']>) => JSX.Element;
};

export function polymorphicFactory<Payload extends PolymorphicFactoryPayload>(
  ui: (props: Payload['props'] & { ref?: 'ref' extends keyof Payload['props'] ? Payload['props']['ref'] : any }) => JSX.Element
) {
  type ComponentProps<C> = PolymorphicComponentProps<C, Payload['props']>;

  type _PolymorphicComponent = <C = Payload['defaultComponent']>(
    props: ComponentProps<C>
  ) => JSX.Element;

  type ComponentProperties = Omit<Component<ComponentProps<any>>, never>;

  type PolymorphicComponent = _PolymorphicComponent &
    ComponentProperties &
    ThemeExtend<Payload> &
    ComponentClasses<Payload> &
    PolymorphicComponentWithProps<Payload> &
    StaticComponents<Payload['staticComponents']> & {
      displayName?: string | undefined;
    };

    const Component = ui as unknown as PolymorphicComponent;
    Component.withProps = (fixedProps: any) => {
      const Extended = ((props: any) => {
        const mergedProps = mergeProps(fixedProps, props);
        return Component(mergedProps as ComponentProps<any>);
      }) as any;
      Extended.extend = Component.extend;
      Extended.displayName = `WithProps(${Component.displayName})`;
      return Extended;
    };

  Component.extend = identity as any;

  return Component as PolymorphicComponent;
}
