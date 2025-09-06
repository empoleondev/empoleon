import clsx from 'clsx';
import { createEffect, JSX, splitProps, children as getChildren } from 'solid-js';
import { useMergedRef } from '@empoleon/hooks';
import { factory, Factory, getRefProp, isElement, useProps } from '../../../core';
import { usePopoverContext } from '../Popover.context';

export interface PopoverTargetProps {
  /** Target element */
  children: JSX.Element | ((props: {
    ref: (element: HTMLElement) => void;
    [key: string]: any;
  }) => JSX.Element);

  /** Key of the prop that should be used to access element ref */
  refProp?: string;

  /** Popup accessible type, `'dialog'` by default */
  popupType?: 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
}

const defaultProps: Partial<PopoverTargetProps> = {
  refProp: 'ref',
  popupType: 'dialog',
};

export type PopoverTargetFactory = Factory<{
  props: PopoverTargetProps;
  ref: HTMLElement;
  compound: true;
}>;

export const PopoverTarget = factory<PopoverTargetFactory>(_props => {
  const props = useProps('PopoverTarget', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'refProp',
    'popupType',
    'ref'
  ])

  const ctx = usePopoverContext();
  const isOpened = () => ctx.opened();

  const targetRef = useMergedRef(ctx.reference, getRefProp(local.children), local.ref);

  if (!isElement(local.children)) {
    throw new Error(
      'Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
    );
  }

  const accessibleProps = ctx.withRoles
    ? {
        'aria-haspopup': local.popupType,
        'aria-expanded': isOpened(),
        'aria-controls': ctx.getDropdownId(),
        id: ctx.getTargetId(),
      }
    : {};

  // Handle render props case
  if (typeof local.children === 'function') {
    const combinedRef = useMergedRef(ctx.reference, local.ref);
    return local.children({
      ref: combinedRef as (element: HTMLElement) => void,
      ...accessibleProps,
      ...ctx.targetProps,
      ...others,
      onClick: !ctx.controlled ? ctx.onToggle : undefined,
    });
  }

  return (
    <span
      {...others}
      {...accessibleProps}
      {...ctx.targetProps}
      class={clsx((ctx.targetProps as any).class, (others as any).class)}
      {...{ [local.refProp!]: targetRef }}
      onClick={!ctx.controlled ? ctx.onToggle : undefined}
    >
      {local.children}
    </span>
  );
});

PopoverTarget.displayName = '@empoleon/core/PopoverTarget';
