import { splitProps } from 'solid-js';
import { CompoundStylesApiProps, factory, Factory, useProps } from '../../core';
import { ModalBaseOverlay, ModalBaseOverlayProps } from '../ModalBase';
import { useDrawerContext } from './Drawer.context';
import classes from './Drawer.module.css';

export type DrawerOverlayStylesNames = 'overlay';

// @ts-ignore
export interface DrawerOverlayProps
  extends ModalBaseOverlayProps,
    CompoundStylesApiProps<DrawerOverlayFactory> {}

export type DrawerOverlayFactory = Factory<{
  props: DrawerOverlayProps;
  ref: HTMLDivElement;
  stylesNames: DrawerOverlayStylesNames;
  compound: true;
}>;

const defaultProps: Partial<DrawerOverlayProps> = {};

export const DrawerOverlay = factory<DrawerOverlayFactory>((_props) => {
  const props = useProps('DrawerOverlay', defaultProps, _props);
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
    <ModalBaseOverlay
      ref={local.ref}
      {...ctx.getStyles('overlay', {
        classNames: local.classNames,
        style: local.style,
        styles: local.styles,
        className: local.className,
      })}
      {...others}
    />
  );
});

DrawerOverlay.classes = classes;
DrawerOverlay.displayName = '@empoleon/core/DrawerOverlay';
