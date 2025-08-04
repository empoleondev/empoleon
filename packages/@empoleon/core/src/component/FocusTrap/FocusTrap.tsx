import { type Component, type JSX, splitProps, type Ref as SolidRef } from 'solid-js';
import { useFocusTrap, useMergedRef } from '@empoleon/hooks';
import { VisuallyHidden, VisuallyHiddenProps } from '../VisuallyHidden';

export interface FocusTrapProps {
  /** Element to trap focus at, must support ref prop */
  children: (props: { ref: SolidRef<any> }) => JSX.Element;

  /** If set to `false`, disables focus trap */
  active: boolean;

  /** Prop that is used to access element ref @default `'ref'` */
  refProp?: string;

  /** Ref to combine with the focus trap ref */
  innerRef?: SolidRef<any>;
}

export const FocusTrap: Component<FocusTrapProps> = (props) => {
  const [local] = splitProps(props, ['children', 'active', 'innerRef']);

  const focusTrapRef = useFocusTrap(() => local.active);
  const combinedRef = useMergedRef(focusTrapRef, local.innerRef as any);

  return local.children({ ref: combinedRef });
};

export function FocusTrapInitialFocus(props: Partial<VisuallyHiddenProps>) {
  return <VisuallyHidden tabIndex={-1} data-autofocus {...props} />;
}
