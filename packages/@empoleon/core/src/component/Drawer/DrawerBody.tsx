import { splitProps } from 'solid-js';
import { CompoundStylesApiProps, factory, Factory, useProps } from '../../core';
import { ModalBaseBody, ModalBaseBodyProps } from '../ModalBase';
import { useDrawerContext } from './Drawer.context';
import classes from './Drawer.module.css';

export type DrawerBodyStylesNames = 'body';

export interface DrawerBodyProps
  extends ModalBaseBodyProps,
    CompoundStylesApiProps<DrawerBodyFactory> {}

export type DrawerBodyFactory = Factory<{
  props: DrawerBodyProps;
  ref: HTMLDivElement;
  stylesNames: DrawerBodyStylesNames;
  compound: true;
}>;

const defaultProps: Partial<DrawerBodyProps> = {};

export const DrawerBody = factory<DrawerBodyFactory>((_props) => {
  const props = useProps('DrawerBody', defaultProps, _props);
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
    <ModalBaseBody
      ref={local.ref}
      {...ctx.getStyles('body', {
        classNames: local.classNames,
        style: local.style,
        styles: local.styles,
        className: local.className,
      })}
      {...others}
    />
  );
});

DrawerBody.classes = classes;
DrawerBody.displayName = '@empoleon/core/DrawerBody';
