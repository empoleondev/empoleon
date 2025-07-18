import { splitProps } from 'solid-js';
import {
  createVarsResolver,
  factory,
  Factory,
  getDefaultZIndex,
  getSize,
  EmpoleonRadius,
  rem,
  StylesApiProps,
  useDirection,
  useProps,
  useStyles,
} from '../../core';
import { ModalBase, ModalBaseProps, ModalBaseStylesNames } from '../ModalBase';
import { ScrollArea } from '../ScrollArea';
import { EmpoleonTransition } from '../Transition';
import { DrawerProvider, ScrollAreaComponent } from './Drawer.context';
import classes from './Drawer.module.css';

type DrawerPosition = 'bottom' | 'left' | 'right' | 'top';

function getDrawerAlign(position: DrawerPosition | undefined) {
  switch (position) {
    case 'top':
      return 'flex-start';
    case 'bottom':
      return 'flex-end';
    default:
      return undefined;
  }
}

function getDrawerFlex(position: DrawerPosition | undefined) {
  if (position === 'top' || position === 'bottom') {
    return '0 0 calc(100% - var(--drawer-offset, 0rem) * 2)';
  }

  return undefined;
}

export type DrawerRootStylesNames = ModalBaseStylesNames;
export type DrawerRootCssVariables = {
  root:
    | '--drawer-size'
    | '--drawer-flex'
    | '--drawer-height'
    | '--drawer-align'
    | '--drawer-justify'
    | '--drawer-offset';
};

export interface DrawerRootProps extends StylesApiProps<DrawerRootFactory>, ModalBaseProps {
  /** Scroll area component, native `div` element by default */
  scrollAreaComponent?: ScrollAreaComponent;

  /** Side of the screen on which drawer will be opened, `'left'` by default */
  position?: DrawerPosition;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem, `0` by default */
  radius?: EmpoleonRadius;

  /** Drawer container offset from the viewport end, `0` by default */
  offset?: number | string;
}

export type DrawerRootFactory = Factory<{
  props: DrawerRootProps;
  ref: HTMLDivElement;
  stylesNames: DrawerRootStylesNames;
  vars: DrawerRootCssVariables;
  compound: true;
}>;

const transitions: Record<DrawerPosition, EmpoleonTransition> = {
  top: 'slide-down',
  bottom: 'slide-up',
  left: 'slide-right',
  right: 'slide-left',
};

const rtlTransitions: Record<DrawerPosition, EmpoleonTransition> = {
  top: 'slide-down',
  bottom: 'slide-up',
  right: 'slide-right',
  left: 'slide-left',
};

const defaultProps: Partial<DrawerRootProps> = {
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex('modal'),
  position: 'left',
};

const varsResolver = createVarsResolver<DrawerRootFactory>((_, { position, size, offset }) => ({
  root: {
    '--drawer-size': getSize(size, 'drawer-size'),
    '--drawer-flex': getDrawerFlex(position),
    '--drawer-height':
      position === 'left' || position === 'right' ? undefined : 'var(--drawer-size)',
    '--drawer-align': getDrawerAlign(position),
    '--drawer-justify': position === 'right' ? 'flex-end' : undefined,
    '--drawer-offset': rem(offset),
  },
}));

export const DrawerRoot = factory<DrawerRootFactory>(_props => {
  const props = useProps('DrawerRoot', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'scrollAreaComponent',
    'position',
    'transitionProps',
    'radius',
    'ref'
  ]);

  const { dir } = useDirection();

  const getStyles = useStyles<DrawerRootFactory>({
    name: 'Drawer',
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

  const drawerTransition = (dir === 'rtl' ? rtlTransitions : transitions)[local.position!];

  return (
    <DrawerProvider value={{ scrollAreaComponent: local.scrollAreaComponent, getStyles, radius: local.radius }}>
      <ModalBase
        ref={local.ref}
        {...getStyles('root')}
        transitionProps={{ transition: drawerTransition, ...local.transitionProps }}
        data-offset-scrollbars={local.scrollAreaComponent === ScrollArea.Autosize || undefined}
        unstyled={local.unstyled}
        {...others}
      />
    </DrawerProvider>
  );
});

DrawerRoot.classes = classes;
DrawerRoot.displayName = '@empoleon/core/DrawerRoot';
