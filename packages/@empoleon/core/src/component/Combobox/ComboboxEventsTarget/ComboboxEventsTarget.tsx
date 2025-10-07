import { JSX, mergeProps, splitProps } from 'solid-js';
import { useMergedRef } from '@empoleon/hooks';
import { factory, Factory, getRefProp, isElement, useProps } from '../../../core';
import { useComboboxContext } from '../Combobox.context';
import { useComboboxTargetProps } from '../use-combobox-target-props/use-combobox-target-props';

export interface ComboboxEventsTargetProps {
  /** Target element */
  children: JSX.Element;

  /** Key of the prop that should be used to access element ref */
  refProp?: string;

  /** Determines whether component should respond to keyboard events, `true` by default */
  withKeyboardNavigation?: boolean;

  /** Determines whether the target should have `aria-` attributes, `true` by default */
  withAriaAttributes?: boolean;

  /** Determines whether the target should have `aria-expanded` attribute, `false` by default */
  withExpandedAttribute?: boolean;

  /** Determines which events should be handled by the target element.
   * `button` target type handles `Space` and `Enter` keys to toggle dropdown opened state.
   * `input` by default.
   * */
  targetType?: 'button' | 'input';

  /** Input autocomplete attribute */
  autoComplete?: string;
}

const defaultProps: Partial<ComboboxEventsTargetProps> = {
  refProp: 'ref',
  targetType: 'input',
  withKeyboardNavigation: true,
  withAriaAttributes: true,
  withExpandedAttribute: false,
  autoComplete: 'off',
};

export type ComboboxEventsTargetFactory = Factory<{
  props: ComboboxEventsTargetProps;
  ref: HTMLElement;
  compound: true;
}>;

export const ComboboxEventsTarget = factory<ComboboxEventsTargetFactory>((_props) => {
  const props = useProps('ComboboxEventsTarget', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'refProp',
    'withKeyboardNavigation',
    'withAriaAttributes',
    'withExpandedAttribute',
    'targetType',
    'autoComplete',
    'ref',
  ]);

  if (!isElement(local.children)) {
    throw new Error(
      'Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
    );
  }

  const ctx = useComboboxContext();
  const targetProps = useComboboxTargetProps({
    targetType: local.targetType,
    withAriaAttributes: local.withAriaAttributes,
    withKeyboardNavigation: local.withAriaAttributes,
    withExpandedAttribute: local.withExpandedAttribute,
    onKeyDown:
      typeof local.children === 'object' && local.children && 'props' in local.children
        ? (local.children.props as any).onKeyDown
        : undefined,
    autoComplete: local.autoComplete,
  });

  const childProps =
    typeof local.children === 'object' && local.children && 'props' in local.children
      ? (local.children.props as any)
      : {};

  const mergedProps = mergeProps(childProps, targetProps, others, {
    [local.refProp!]: useMergedRef(local.ref, ctx.store.targetRef, getRefProp(local.children)),
  });

  return typeof local.children === 'object' && local.children && 'type' in local.children
    ? { ...local.children, props: mergedProps }
    : local.children;
});

ComboboxEventsTarget.displayName = '@empoleon/core/ComboboxEventsTarget';
