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
import { useSubMenuContext } from '../MenuSub/MenuSub.context';
import classes from '../Menu.module.css';
import { splitProps } from 'solid-js';

export type MenuSubDropdownStylesNames = 'dropdown';

export interface MenuSubDropdownProps
  extends BoxProps,
    CompoundStylesApiProps<MenuSubDropdownFactory>,
    ElementProps<'div'> {}

export type MenuSubDropdownFactory = Factory<{
  props: MenuSubDropdownProps;
  ref: HTMLDivElement;
  stylesNames: MenuSubDropdownStylesNames;
  compound: true;
}>;

const defaultProps: Partial<MenuSubDropdownProps> = {};

export const MenuSubDropdown = factory<MenuSubDropdownFactory>(_props => {
  const props = useProps('MenuSubDropdown', defaultProps, _props);
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
    'ref'
  ])

  const wrapperRef: HTMLDivElement | null = null;
  const ctx = useMenuContext();
  const subCtx = useSubMenuContext();

  const handleMouseEnter = createEventHandler<any>(local.onMouseEnter, subCtx?.open);

  const handleMouseLeave = createEventHandler<any>(local.onMouseLeave, subCtx?.close);

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
    >
      {local.children}
    </Popover.Dropdown>
  );
});

MenuSubDropdown.classes = classes;
MenuSubDropdown.displayName = '@empoleon/core/MenuSubDropdown';
