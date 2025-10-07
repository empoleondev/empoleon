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

export type MenuLabelStylesNames = 'label';

export interface MenuLabelProps
  extends BoxProps,
    CompoundStylesApiProps<MenuLabelFactory>,
    ElementProps<'div'> {}

export type MenuLabelFactory = Factory<{
  props: MenuLabelProps;
  ref: HTMLDivElement;
  stylesNames: MenuLabelStylesNames;
  compound: true;
}>;

export const MenuLabel = factory<MenuLabelFactory>((_props) => {
  const props = useProps('MenuLabel', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'ref',
  ]);
  const ctx = useMenuContext();

  return (
    <Box
      ref={local.ref}
      {...ctx.getStyles('label', {
        className: local.className,
        style: local.style,
        styles: local.styles,
        classNames: local.classNames,
      })}
      {...others}
    />
  );
});

MenuLabel.classes = classes;
MenuLabel.displayName = '@empoleon/core/MenuLabel';
