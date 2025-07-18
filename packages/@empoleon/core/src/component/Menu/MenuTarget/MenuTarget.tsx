import { splitProps, children as resolveChildren, JSX } from 'solid-js';
import { createEventHandler, isElement, useProps } from '../../../core';
import { Popover } from '../../Popover';
import { useMenuContext } from '../Menu.context';

export interface MenuTargetProps {
  /** Target element */
  children: JSX.Element;

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
  const [local, others] = splitProps(props, [
    'children',
    'refProp',
    'ref'
  ])

  // if (!isElement(local.children)) {
  //   throw new Error(
  //     'Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
  //   );
  // }

  const ctx = useMenuContext();
  const childrenAccessor = resolveChildren(() => local.children);

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
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-expanded={ctx.opened ? true : undefined}
        style={{ display: 'contents' }}
      >
        {childrenAccessor()}
      </div>
    </Popover.Target>
  );
};

MenuTarget.displayName = '@empoleon/core/MenuTarget';
