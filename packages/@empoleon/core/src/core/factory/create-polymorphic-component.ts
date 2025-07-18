import { Component, ComponentProps, JSX } from 'solid-js';

type ExtendedProps<Props = {}, OverrideProps = {}> = OverrideProps &
  Omit<Props, keyof OverrideProps>;

type ElementType = keyof JSX.IntrinsicElements | Component<any>;

type PropsOf<C extends ElementType> = C extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[C]
  : C extends Component<infer P>
  ? P
  : never;

type ComponentProp<C> = {
  component?: C;
};

type InheritedProps<C extends ElementType, Props = {}> = ExtendedProps<PropsOf<C>, Props>;

export type PolymorphicRef<C> = C extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[C]['ref']
  : C extends Component<any>
  ? any
  : never;

export type PolymorphicComponentProps<C, Props = {}> = C extends ElementType
  ? InheritedProps<C, Props & ComponentProp<C>> & {
      ref?: PolymorphicRef<C>;
      renderRoot?: (props: any) => any;
    }
  : Props & { component: ElementType; renderRoot?: (props: Record<string, any>) => any };

export function createPolymorphicComponent<
  ComponentDefaultType,
  Props,
  StaticComponents = Record<string, never>,
>(component: any) {
  type ComponentProps<C> = PolymorphicComponentProps<C, Props>;

  type _PolymorphicComponent = <C = ComponentDefaultType>(
    props: ComponentProps<C>
  ) => JSX.Element;

  type ComponentProperties = Omit<Component<ComponentProps<any>>, never>;

  type PolymorphicComponent = _PolymorphicComponent & ComponentProperties & StaticComponents;

  return component as PolymorphicComponent;
}
