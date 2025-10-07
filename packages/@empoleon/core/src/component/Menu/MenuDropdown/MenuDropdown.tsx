import { splitProps } from 'solid-js';
import { useMergedRef } from '@empoleon/hooks';
import {
  BoxProps,
  CompoundStylesApiProps,
  createEventHandler,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '../../../core';
import { Popover } from '../../Popover';
import { useMenuContext } from '../Menu.context';
import classes from '../Menu.module.css';

export type MenuDropdownStylesNames = 'dropdown';

export interface MenuDropdownProps
  extends BoxProps,
    CompoundStylesApiProps<MenuDropdownFactory>,
    ElementProps<'div'> {}

export type MenuDropdownFactory = Factory<{
  props: MenuDropdownProps;
  ref: HTMLDivElement;
  stylesNames: MenuDropdownStylesNames;
  compound: true;
}>;

export const MenuDropdown = factory<MenuDropdownFactory>((_props) => {
  const props = useProps('MenuDropdown', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'onMouseEnter',
    'onMouseLeave',
    'onKeyDown',
    'children',
    'ref',
  ]);

  let wrapperRef: HTMLDivElement | undefined;
  const ctx = useMenuContext();

  const handleKeyDown = createEventHandler<any>(local.onKeyDown, (event: any) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      wrapperRef
        ?.querySelectorAll<HTMLButtonElement>('[data-menu-item]:not(:disabled)')[0]
        ?.focus();
    }
  });

  const handleMouseEnter = createEventHandler<any>(
    local.onMouseEnter,
    () => (ctx.trigger === 'hover' || ctx.trigger === 'click-hover') && ctx.openDropdown()
  );

  const handleMouseLeave = createEventHandler<any>(
    local.onMouseLeave,
    () => (ctx.trigger === 'hover' || ctx.trigger === 'click-hover') && ctx.closeDropdown()
  );

  return (
    <Popover.Dropdown
      {...others}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="menu"
      aria-orientation="vertical"
      ref={useMergedRef(local.ref, wrapperRef)}
      {...ctx.getStyles('dropdown', {
        className: local.className,
        style: local.style,
        styles: local.styles,
        classNames: local.classNames,
        withStaticClass: false,
      })}
      tabIndex={-1}
      data-menu-dropdown
      onKeyDown={handleKeyDown}
    >
      {ctx.withInitialFocusPlaceholder && (
        <div tabIndex={-1} data-autofocus data-empoleon-stop-propagation style={{ outline: 0 }} />
      )}
      {local.children}
    </Popover.Dropdown>
  );
});

MenuDropdown.classes = classes;
MenuDropdown.displayName = '@empoleon/core/MenuDropdown';
