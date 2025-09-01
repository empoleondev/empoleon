import { JSX, mergeProps, splitProps } from 'solid-js';
import { useMergedRef } from '@empoleon/hooks';
import { factory, Factory, isElement, useProps } from '../../../core';
import { Popover } from '../../Popover';
import { useComboboxContext } from '../Combobox.context';
import { useComboboxTargetProps } from '../use-combobox-target-props/use-combobox-target-props';
import { Dynamic } from 'solid-js/web';

export interface ComboboxTargetProps {
  /** Target element */
  children: JSX.Element | ((props: { ref: (element: HTMLElement) => void; [key: string]: any }) => JSX.Element);

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

const defaultProps: Partial<ComboboxTargetProps> = {
  refProp: 'ref',
  targetType: 'input',
  withKeyboardNavigation: true,
  withAriaAttributes: true,
  withExpandedAttribute: false,
  autoComplete: 'off',
};

export type ComboboxTargetFactory = Factory<{
  props: ComboboxTargetProps;
  ref: HTMLElement;
  compound: true;
}>;

export const ComboboxTarget = factory<ComboboxTargetFactory>(_props => {
  const props = useProps('ComboboxTarget', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'refProp',
    'withKeyboardNavigation',
    'withAriaAttributes',
    'withExpandedAttribute',
    'targetType',
    'autoComplete',
    'ref'
  ]);

  // if (!isElement(local.children)) {
  //   throw new Error(
  //     'Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
  //   );
  // }

  const ctx = useComboboxContext();

  const targetProps = useComboboxTargetProps({
    targetType: local.targetType,
    withAriaAttributes: local.withAriaAttributes,
    withKeyboardNavigation: local.withKeyboardNavigation,
    withExpandedAttribute: local.withExpandedAttribute,
    onKeyDown: typeof local.children === 'object' && local.children && 'props' in local.children
    ? (local.children.props as any).onKeyDown
    : undefined,
    autoComplete: local.autoComplete,
  });

  const mergedProps = mergeProps(targetProps, others);

  return (
  <Popover.Target>
    {(popoverProps) => {
      const ref = useMergedRef(popoverProps.ref, ctx.store.targetRef, local.ref);
      const allProps = mergeProps(mergedProps, popoverProps);

      // Wrapper-free path: function child gets all props + ref
      if (typeof local.children === 'function') {
        return (local.children as any)({
          ...allProps,
          [local.refProp!]: ref,
        });
      }

      // Fallback for plain JSX element children: minimal wrapper as the measured target
      return (
        <div {...allProps} {...{ [local.refProp!]: ref }}>
          <Dynamic component={local.children as any} {...mergedProps} />
        </div>
      );
    }}
  </Popover.Target>
);
});

ComboboxTarget.displayName = '@empoleon/core/ComboboxTarget';
