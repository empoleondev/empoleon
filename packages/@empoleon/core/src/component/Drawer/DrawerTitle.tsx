import { splitProps } from 'solid-js';
import { CompoundStylesApiProps, factory, Factory, useProps } from '../../core';
import { ModalBaseTitle, ModalBaseTitleProps } from '../ModalBase';
import { useDrawerContext } from './Drawer.context';
import classes from './Drawer.module.css';

export type DrawerTitleStylesNames = 'title';

export interface DrawerTitleProps
  extends ModalBaseTitleProps,
    CompoundStylesApiProps<DrawerTitleFactory> {}

export type DrawerTitleFactory = Factory<{
  props: DrawerTitleProps;
  ref: HTMLHeadingElement;
  stylesNames: DrawerTitleStylesNames;
  compound: true;
}>;

const defaultProps: Partial<DrawerTitleProps> = {};

export const DrawerTitle = factory<DrawerTitleFactory>(_props => {
  const props = useProps('DrawerTitle', defaultProps, _props);
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
    <ModalBaseTitle
      ref={local.ref}
      {...ctx.getStyles('title', { classNames: local.classNames, style: local.style, styles: local.styles, className: local.className })}
      {...others}
    />
  );
});

DrawerTitle.classes = classes;
DrawerTitle.displayName = '@empoleon/core/DrawerTitle';
