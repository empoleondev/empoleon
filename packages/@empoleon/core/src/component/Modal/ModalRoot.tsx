import { JSX, splitProps } from 'solid-js';
import {
  createVarsResolver,
  factory,
  Factory,
  getDefaultZIndex,
  getRadius,
  getSize,
  EmpoleonRadius,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { ModalBase, ModalBaseProps, ModalBaseStylesNames } from '../ModalBase';
import { ScrollArea } from '../ScrollArea';
import { ModalProvider, ScrollAreaComponent } from './Modal.context';
import classes from './Modal.module.css';

export type ModalRootStylesNames = ModalBaseStylesNames;
export type ModalRootCssVariables = {
  root: '--modal-radius' | '--modal-size' | '--modal-y-offset' | '--modal-x-offset';
};

export interface ModalRootProps extends StylesApiProps<ModalRootFactory>, ModalBaseProps {
  __staticSelector?: string;

  /** Top/bottom modal offset, `5dvh` by default */
  yOffset?: JSX.CSSProperties['margin-top'];

  /** Left/right modal offset, `5vw` by default */
  xOffset?: JSX.CSSProperties['margin-left'];

  /** Scroll area component, native `div` element by default */
  scrollAreaComponent?: ScrollAreaComponent;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Determines whether the modal should be centered vertically, `false` by default */
  centered?: boolean;

  /** Determines whether the modal should take the entire screen, `false` by default */
  fullScreen?: boolean;
}

export type ModalRootFactory = Factory<{
  props: ModalRootProps;
  ref: HTMLDivElement;
  stylesNames: ModalRootStylesNames;
  vars: ModalRootCssVariables;
  compound: true;
}>;

const defaultProps: Partial<ModalRootProps> = {
  __staticSelector: 'Modal',
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex('modal'),
  transitionProps: { duration: 200, transition: 'fade-down' },
  yOffset: '5dvh',
};

const varsResolver = createVarsResolver<ModalRootFactory>(
  (_, { radius, size, yOffset, xOffset }) => ({
    root: {
      '--modal-radius': radius === undefined ? undefined : getRadius(radius),
      '--modal-size': getSize(size, 'modal-size'),
      '--modal-y-offset': rem(yOffset),
      '--modal-x-offset': rem(xOffset),
    },
  })
);

export const ModalRoot = factory<ModalRootFactory>(_props => {
  const props = useProps('ModalRoot', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'yOffset',
    'scrollAreaComponent',
    'radius',
    'fullScreen',
    'centered',
    'xOffset',
    '__staticSelector',
    'ref'
  ]);

  const getStyles = useStyles<ModalRootFactory>({
    name: local.__staticSelector!,
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  return (
    <ModalProvider value={{ yOffset: local.yOffset, scrollAreaComponent: local.scrollAreaComponent, getStyles, fullScreen: local.fullScreen }}>
      <ModalBase
        ref={local.ref}
        {...getStyles('root')}
        data-full-screen={local.fullScreen || undefined}
        data-centered={local.centered || undefined}
        data-offset-scrollbars={local.scrollAreaComponent === ScrollArea.Autosize || undefined}
        unstyled={local.unstyled}
        {...others}
      />
    </ModalProvider>
  );
});

ModalRoot.classes = classes;
ModalRoot.displayName = '@empoleon/core/ModalRoot';
