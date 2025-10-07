import { JSX, children as resolveChildren, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { createEventHandler, isElement, useProps } from '../../../core';
import { Popover } from '../../Popover';
import { useMenuContext } from '../Menu.context';

export interface MenuTargetProps {
  /** Target element */
  children: JSX.Element | ((triggerProps: any) => JSX.Element);

  /** Key of the prop that should be used to get element ref */
  refProp?: string;

  /** Ref prop for forwarding */
  ref?: any;
}

const defaultProps: Partial<MenuTargetProps> = {
  refProp: 'ref',
};

export function MenuTarget(_props: MenuTargetProps) {
  const props = useProps('MenuTarget', defaultProps, _props);
  const [local, others] = splitProps(props, ['children', 'refProp', 'ref']);

  if (!isElement(local.children)) {
    throw new Error(
      'Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
    );
  }

  const ctx = useMenuContext();
  const childrenAccessor = resolveChildren(() => local.children as any);

  const onClick = createEventHandler(undefined, () => {
    if (ctx.trigger === 'click') {
      ctx.toggleDropdown();
    } else if (ctx.trigger === 'click-hover') {
      ctx.setOpenedViaClick(true);
      if (!ctx.opened) {
        ctx.openDropdown();
      }
    }
  });

  const onMouseEnter = createEventHandler(
    undefined,
    () => (ctx.trigger === 'hover' || ctx.trigger === 'click-hover') && ctx.openDropdown()
  );

  const onMouseLeave = createEventHandler(undefined, () => {
    if (ctx.trigger === 'hover') {
      ctx.closeDropdown();
    } else if (ctx.trigger === 'click-hover' && !ctx.openedViaClick) {
      ctx.closeDropdown();
    }
  });

  return (
    <Popover.Target refProp={local.refProp} popupType="menu" ref={local.ref} {...others}>
      {(popoverProps) => {
        const triggerProps = {
          ...popoverProps,
          onClick: (e: MouseEvent) => {
            popoverProps.onClick?.(e as any);
            e.stopPropagation();
            onClick(e);
          },
          onMouseEnter: (e: MouseEvent) => {
            popoverProps.onMouseEnter?.(e as any);
            onMouseEnter(e);
          },
          onMouseLeave: (e: MouseEvent) => {
            popoverProps.onMouseLeave?.(e as any);
            onMouseLeave(e);
          },
          'data-expanded': ctx.opened ? true : undefined,
        };

        const child = childrenAccessor();

        if (typeof child === 'function') {
          // asChild API: user spreads props onto their own element -> no extra div
          return (child as (p: any) => JSX.Element)(triggerProps);
        }

        // fallback: render a chosen element as the trigger (no extra wrapper)
        return (
          <Dynamic component={'div'} {...triggerProps}>
            {child}
          </Dynamic>
        );
      }}
    </Popover.Target>
  );
}

MenuTarget.displayName = '@empoleon/core/MenuTarget';
