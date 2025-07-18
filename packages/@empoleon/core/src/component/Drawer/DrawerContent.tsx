import { splitProps } from 'solid-js';
import { CompoundStylesApiProps, factory, Factory, useProps } from '../../core';
import { ModalBaseContent, ModalBaseContentProps, NativeScrollArea } from '../ModalBase';
import { useDrawerContext } from './Drawer.context';
import classes from './Drawer.module.css';

export type DrawerContentStylesNames = 'content' | 'inner';

export interface DrawerContentProps
  extends ModalBaseContentProps,
    CompoundStylesApiProps<DrawerContentFactory> {
  __hidden?: boolean;
}

export type DrawerContentFactory = Factory<{
  props: DrawerContentProps;
  ref: HTMLDivElement;
  stylesNames: DrawerContentStylesNames;
  compound: true;
}>;

const defaultProps: Partial<DrawerContentProps> = {};

export const DrawerContent = factory<DrawerContentFactory>(_props => {
  const props = useProps('DrawerContent', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'children',
    'radius',
    '__hidden',
    'ref'
  ]);

  const ctx = useDrawerContext();
  const Scroll = ctx.scrollAreaComponent || NativeScrollArea;

  return (
    <ModalBaseContent
      {...ctx.getStyles('content', { className: local.className, style: local.style, styles: local.styles, classNames: local.classNames })}
      innerProps={ctx.getStyles('inner', { className: local.className, style: local.style, styles: local.styles, classNames: local.classNames })}
      ref={local.ref}
      {...others}
      radius={local.radius || ctx.radius || 0}
      data-hidden={local.__hidden || undefined}
    >
      <div style={{ height: 'calc(100vh - var(--drawer-offset) * 2)' }}>
        <Scroll>{local.children}</Scroll>
      </div>
    </ModalBaseContent>
  );
});

DrawerContent.classes = classes;
DrawerContent.displayName = '@empoleon/core/DrawerContent';
