import { splitProps } from 'solid-js';
import { CompoundStylesApiProps, factory, Factory, useProps } from '../../core';
import { ModalBaseHeader, ModalBaseHeaderProps } from '../ModalBase';
import { useDrawerContext } from './Drawer.context';
import classes from './Drawer.module.css';

export type DrawerHeaderStylesNames = 'header';

export interface DrawerHeaderProps
  extends ModalBaseHeaderProps,
    CompoundStylesApiProps<DrawerHeaderFactory> {}

export type DrawerHeaderFactory = Factory<{
  props: DrawerHeaderProps;
  ref: HTMLElement;
  stylesNames: DrawerHeaderStylesNames;
  compound: true;
}>;

const defaultProps: Partial<DrawerHeaderProps> = {};

export const DrawerHeader = factory<DrawerHeaderFactory>(_props => {
  const props = useProps('DrawerHeader', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'ref'
  ]);

  const ctx = useDrawerContext();

  return (
    <ModalBaseHeader
      ref={local.ref}
      {...ctx.getStyles('header', { classNames: local.classNames, style: local.style, styles: local.styles, className: local.className })}
      {...others}
    />
  );
});

DrawerHeader.classes = classes;
DrawerHeader.displayName = '@empoleon/core/DrawerHeader';
