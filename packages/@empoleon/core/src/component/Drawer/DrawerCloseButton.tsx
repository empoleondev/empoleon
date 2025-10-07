import { splitProps } from 'solid-js';
import { CompoundStylesApiProps, factory, Factory, useProps } from '../../core';
import { ModalBaseCloseButton, ModalBaseCloseButtonProps } from '../ModalBase';
import { useDrawerContext } from './Drawer.context';
import classes from './Drawer.module.css';

export type DrawerCloseButtonStylesNames = 'close';

export interface DrawerCloseButtonProps
  extends ModalBaseCloseButtonProps,
    CompoundStylesApiProps<DrawerCloseButtonFactory> {}

export type DrawerCloseButtonFactory = Factory<{
  props: DrawerCloseButtonProps;
  ref: HTMLButtonElement;
  stylesNames: DrawerCloseButtonStylesNames;
  compound: true;
}>;

const defaultProps: Partial<DrawerCloseButtonProps> = {};

export const DrawerCloseButton = factory<DrawerCloseButtonFactory>((_props) => {
  const props = useProps('DrawerCloseButton', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'ref',
  ]);

  const ctx = useDrawerContext();

  return (
    <ModalBaseCloseButton
      ref={local.ref}
      {...ctx.getStyles('close', {
        classNames: local.classNames,
        style: local.style,
        styles: local.styles,
        className: local.className,
      })}
      {...others}
    />
  );
});

DrawerCloseButton.classes = classes;
DrawerCloseButton.displayName = '@empoleon/core/DrawerCloseButton';
