import { createEffect, createMemo, JSX, splitProps } from 'solid-js';
import { factory, Factory, getDefaultZIndex, useProps } from '../../core';
import { ModalBaseCloseButtonProps, ModalBaseOverlayProps } from '../ModalBase';
import { DrawerBody } from './DrawerBody';
import { DrawerCloseButton } from './DrawerCloseButton';
import { DrawerContent } from './DrawerContent';
import { DrawerHeader } from './DrawerHeader';
import { DrawerOverlay } from './DrawerOverlay';
import {
  DrawerRoot,
  DrawerRootCssVariables,
  DrawerRootProps,
  DrawerRootStylesNames,
} from './DrawerRoot';
import { DrawerStack, useDrawerStackContext } from './DrawerStack';
import { DrawerTitle } from './DrawerTitle';
import classes from './Drawer.module.css';

export type DrawerStylesNames = DrawerRootStylesNames;
export type DrawerCssVariables = DrawerRootCssVariables;

export interface DrawerProps extends DrawerRootProps {
  /** Drawer title */
  title?: JSX.Element;

  /** Determines whether the overlay should be rendered, `true` by default */
  withOverlay?: boolean;

  /** Props passed down to the `Overlay` component, can be used to configure opacity, `background-color`, styles and other properties */
  overlayProps?: ModalBaseOverlayProps;

  /** Drawer content */
  children?: JSX.Element;

  /** Determines whether the close button should be rendered, `true` by default */
  withCloseButton?: boolean;

  /** Props passed down to the close button */
  closeButtonProps?: ModalBaseCloseButtonProps;

  /** Id of the drawer in the `Drawer.Stack` */
  stackId?: string;
}

export type DrawerFactory = Factory<{
  props: DrawerProps;
  ref: HTMLDivElement;
  stylesNames: DrawerStylesNames;
  vars: DrawerCssVariables;
  staticComponents: {
    Root: typeof DrawerRoot;
    Overlay: typeof DrawerOverlay;
    Content: typeof DrawerContent;
    Body: typeof DrawerBody;
    Header: typeof DrawerHeader;
    Title: typeof DrawerTitle;
    CloseButton: typeof DrawerCloseButton;
    Stack: typeof DrawerStack;
  };
}>;

const defaultProps = {
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex('modal'),
  withOverlay: true,
  withCloseButton: true,
} satisfies Partial<DrawerProps>;;

export const Drawer = factory<DrawerFactory>(_props => {
  const props = useProps('Drawer', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'title',
    'withOverlay',
    'overlayProps',
    'withCloseButton',
    'closeButtonProps',
    'children',
    'opened',
    'stackId',
    'zIndex',
    'ref'
  ])

  const openedFn = createMemo(() => (typeof local.opened === 'function' ? local.opened() : local.opened));

  const ctx = useDrawerStackContext();
  const isStacked = createMemo(() => !!(ctx && local.stackId));
  const isCurrent = createMemo(() => isStacked() && ctx?.currentId === local.stackId);

  const stackProps = createMemo(() => {
    if (!isStacked()) {
      return {};
    }
    return {
      closeOnEscape: isCurrent(),
      trapFocus: isCurrent(),
      zIndex: ctx?.getZIndex(local.stackId!),
    };
  });

  const hasHeader = () => !!local.title || local.withCloseButton;

  const overlayVisible = createMemo(() =>
    local.withOverlay === false ? false :
    (local.stackId && ctx ? ctx.currentId === local.stackId : openedFn())
  );

  createEffect(() => {
    if (ctx && local.stackId) {
      if (openedFn()) {
        ctx.addModal(local.stackId, local.zIndex || getDefaultZIndex('modal'));
      } else {
        ctx.removeModal(local.stackId);
      }
    }
  });

  return (
    <DrawerRoot
      ref={local.ref}
      opened={openedFn}
      zIndex={ctx && local.stackId ? ctx.getZIndex(local.stackId) : local.zIndex}
      {...others}
      {...stackProps()}
    >
      {local.withOverlay && (
        <DrawerOverlay
          visible={overlayVisible()}
          transitionProps={ctx && local.stackId ? { duration: 0 } : undefined}
          {...local.overlayProps}
        />
      )}
      <DrawerContent __hidden={!openedFn() || (!!(ctx && local.stackId) && ctx.currentId !== local.stackId)}>
        {hasHeader() && (
          <DrawerHeader>
            {local.title && <DrawerTitle>{local.title}</DrawerTitle>}
            {local.withCloseButton && <DrawerCloseButton {...local.closeButtonProps} />}
          </DrawerHeader>
        )}

        <DrawerBody>{local.children}</DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
});

Drawer.classes = classes;
Drawer.displayName = '@empoleon/core/Drawer';
Drawer.Root = DrawerRoot;
Drawer.Overlay = DrawerOverlay;
Drawer.Content = DrawerContent;
Drawer.Body = DrawerBody;
Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.CloseButton = DrawerCloseButton;
Drawer.Stack = DrawerStack;
