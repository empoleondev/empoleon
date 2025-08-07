import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '../../../core';
import { useMenuContext } from '../Menu.context';
import classes from '../Menu.module.css';

export type MenuDividerStylesNames = 'divider';

export interface MenuDividerProps
  extends BoxProps,
    CompoundStylesApiProps<MenuDividerFactory>,
    ElementProps<'div'> {}

export type MenuDividerFactory = Factory<{
  props: MenuDividerProps;
  ref: HTMLDivElement;
  stylesNames: MenuDividerStylesNames;
  compound: true;
}>;

export const MenuDivider = factory<MenuDividerFactory>(_props => {
  const props = useProps(
    'MenuDivider',
    null,
    _props
  );
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'ref'
  ])
  const ctx = useMenuContext();

  return (
    <Box
      ref={local.ref}
      {...ctx.getStyles('divider', { className: local.className, style: local.style, styles: local.styles, classNames: local.classNames })}
      {...others}
    />
  );
});

MenuDivider.classes = classes;
MenuDivider.displayName = '@empoleon/core/MenuDivider';
