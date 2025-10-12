import { ComponentProps, JSX, splitProps } from 'solid-js';
import { RemoveScroll } from '@empoleon/solid-remove-scroll';
import {
  Box,
  BoxProps,
  ElementProps,
  EmpoleonShadow,
  EmpoleonSize,
  EmpoleonSpacing,
  getDefaultZIndex,
  getShadow,
  getSpacing,
} from '../../core';
import { OptionalPortal, PortalProps } from '../Portal';
import { TransitionOverride } from '../Transition';
import { ModalBaseProvider } from './ModalBase.context';
import { useModal } from './use-modal';

type RemoveScrollProps = Omit<ComponentProps<typeof RemoveScroll>, 'children'>;

export interface ModalBaseProps extends BoxProps, ElementProps<'div', 'title'> {
  unstyled?: boolean;

  /** If set modal/drawer will not be unmounted from the DOM when it is hidden, `display: none` styles will be added instead, `false` by default */
  keepMounted?: boolean;

  /** Determines whether modal/drawer is opened */
  opened: (() => boolean) | boolean;

  /** Called when modal/drawer is closed */
  onClose: () => void;

  /** Id used to connect modal/drawer with body and title */
  id?: string;

  /** Determines whether scroll should be locked when `opened={true}`, `true` by default */
  lockScroll?: boolean;

  /** Determines whether focus should be trapped, `true` by default */
  trapFocus?: boolean;

  /** Determines whether the component should be rendered inside `Portal`, `true` by default */
  withinPortal?: boolean;

  /** Props passed down to the Portal component when `withinPortal` is set */
  portalProps?: Omit<PortalProps, 'children'>;

  /** Modal/drawer content */
  children?: JSX.Element;

  /** Determines whether the modal/drawer should be closed when user clicks on the overlay, `true` by default */
  closeOnClickOutside?: boolean;

  /** Props added to the `Transition` component that used to animate overlay and body, use to configure duration and animation type, `{ duration: 200, transition: 'fade-down' }` by default */
  transitionProps?: TransitionOverride;

  /** Called when exit transition ends */
  onExitTransitionEnd?: () => void;

  /** Called when enter transition ends */
  onEnterTransitionEnd?: () => void;

  /** Determines whether `onClose` should be called when user presses the escape key, `true` by default */
  closeOnEscape?: boolean;

  /** Determines whether focus should be returned to the last active element when `onClose` is called, `true` by default */
  returnFocus?: boolean;

  /** `z-index` CSS property of the root element, `200` by default */
  zIndex?: string | number;

  /** Key of `theme.shadows` or any valid CSS box-shadow value, 'xl' by default */
  shadow?: EmpoleonShadow;

  /** Key of `theme.spacing` or any valid CSS value to set content, header and footer padding, `'md'` by default */
  padding?: EmpoleonSpacing;

  /** Controls width of the content area, `'md'` by default */
  size?: EmpoleonSize | (string & {}) | number;

  /** Props passed down to react-remove-scroll, can be used to customize scroll lock behavior */
  removeScrollProps?: RemoveScrollProps;
}

export function ModalBase(props: ModalBaseProps) {
  const [local, others] = splitProps(props, [
    'keepMounted',
    'opened',
    'onClose',
    'id',
    'transitionProps',
    'onExitTransitionEnd',
    'onEnterTransitionEnd',
    'trapFocus',
    'closeOnEscape',
    'returnFocus',
    'closeOnClickOutside',
    'withinPortal',
    'portalProps',
    'lockScroll',
    'children',
    'zIndex',
    'shadow',
    'padding',
    '__vars',
    'unstyled',
    'removeScrollProps',
    'ref',
  ]);

  const openedFn = () => {
    const result = typeof local.opened === 'function' ? local.opened() : local.opened;
    return result;
  };

  const transitionProps = () => local.transitionProps;

  const modalProps = useModal({
    id: local.id,
    transitionProps: transitionProps(),
    opened: openedFn,
    trapFocus: () => local.trapFocus,
    closeOnEscape: () => local.closeOnEscape,
    onClose: local.onClose,
    returnFocus: () => local.returnFocus,
  });

  const { ...otherRemoveScrollProps } = local.removeScrollProps || {};

  return (
    <OptionalPortal {...local.portalProps} withinPortal={local.withinPortal}>
      <ModalBaseProvider
        value={{
          opened: openedFn,
          onClose: local.onClose,
          closeOnClickOutside: () => local.closeOnClickOutside,
          onExitTransitionEnd: local.onEnterTransitionEnd,
          onEnterTransitionEnd: local.onEnterTransitionEnd,
          transitionProps: { ...transitionProps(), keepMounted: local.keepMounted },
          getTitleId: () => `${modalProps._id}-title`,
          getBodyId: () => `${modalProps._id}-body`,
          titleMounted: modalProps.titleMounted(),
          bodyMounted: modalProps.bodyMounted(),
          setTitleMounted: modalProps.setTitleMounted,
          setBodyMounted: modalProps.setBodyMounted,
          trapFocus: () => local.trapFocus ?? true,
          closeOnEscape: () => local.closeOnEscape,
          zIndex: local.zIndex,
          unstyled: local.unstyled,
        }}
      >
        <RemoveScroll
          enabled={modalProps.shouldLockScroll() && local.lockScroll}
          {...otherRemoveScrollProps}
        >
          <Box
            ref={local.ref}
            {...others}
            __vars={{
              ...local.__vars,
              '--mb-z-index': (local.zIndex || getDefaultZIndex('modal')).toString(),
              '--mb-shadow': getShadow(local.shadow),
              '--mb-padding': getSpacing(local.padding),
            }}
          >
            {local.children}
          </Box>
        </RemoveScroll>
      </ModalBaseProvider>
    </OptionalPortal>
  );
}

ModalBase.displayName = '@empoleon/core/ModalBase';
