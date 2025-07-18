import { type Component, type JSX, splitProps, type Ref as SolidRef } from 'solid-js';
import { useFocusTrap, useMergedRef } from '@empoleon/hooks';

export interface FocusTrapProps {
  // 1. The type of `children` is now a function that receives an object with a ref
  children: (props: { ref: SolidRef<any> }) => JSX.Element;
  active: boolean;
  innerRef?: SolidRef<any>;
}

export const FocusTrap: Component<FocusTrapProps> = (props) => {
  const [local] = splitProps(props, ['children', 'active', 'innerRef']);

  const focusTrapRef = useFocusTrap(() => local.active);
  const combinedRef = useMergedRef(focusTrapRef, local.innerRef as any);

  // 2. We call the children function, passing it an object containing the ref
  return local.children({ ref: combinedRef });
};
