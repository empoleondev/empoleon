import { createSignal, splitProps, JSX, createEffect, createMemo, onCleanup } from 'solid-js';
import { useClickOutside, useId } from '@empoleon/hooks';
import {
  createVarsResolver,
  ElementProps,
  ExtendComponent,
  Factory,
  getDefaultZIndex,
  getRadius,
  getShadow,
  EmpoleonRadius,
  EmpoleonShadow,
  StylesApiProps,
  useDirection,
  useEmpoleonEnv,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '../../core';
import {
  ArrowPosition,
  FloatingAxesOffsets,
  FloatingPosition,
  FloatingStrategy,
  getFloatingPosition,
} from '../../utils/Floating';
import { Overlay, OverlayProps } from '../Overlay';
import { OptionalPortal, PortalProps } from '../Portal';
import { Transition, TransitionOverride } from '../Transition';
import { PopoverContextProvider } from './Popover.context';
import { PopoverMiddlewares, PopoverWidth } from './Popover.types';
import { PopoverDropdown } from './PopoverDropdown/PopoverDropdown';
import { PopoverTarget } from './PopoverTarget/PopoverTarget';
import { usePopover } from './use-popover';
import classes from './Popover.module.css';

export type PopoverStylesNames = 'dropdown' | 'arrow' | 'overlay';
export type PopoverCssVariables = {
  dropdown: '--popover-radius' | '--popover-shadow';
};

export interface __PopoverProps {
  /** Dropdown position relative to the target element, `'bottom'` by default */
  position?: FloatingPosition;

  /** Offset of the dropdown element, `8` by default */
  offset?: number | FloatingAxesOffsets;

  /** Called when dropdown position changes */
  onPositionChange?: (position: FloatingPosition) => void;

  /** `useEffect` dependencies to force update dropdown position, `[]` by default */
  positionDependencies?: any[];

  /** Called when dropdown closes */
  onClose?: () => void;

  /** Called when the popover is dismissed by clicking outside or by pressing escape */
  onDismiss?: () => void;

  /** Called when dropdown opens */
  onOpen?: () => void;

  /** If set dropdown will not be unmounted from the DOM when it is hidden, `display: none` styles will be added instead */
  keepMounted?: boolean;

  /** Props passed down to the `Transition` component that used to animate dropdown presence, use to configure duration and animation type, `{ duration: 150, transition: 'fade' }` by default */
  transitionProps?: TransitionOverride;

  /** Called when exit transition ends */
  onExitTransitionEnd?: () => void;

  /** Called when enter transition ends */
  onEnterTransitionEnd?: () => void;

  /** Dropdown width, or `'target'` to make dropdown width the same as target element, `'max-content'` by default */
  width?: PopoverWidth;

  /** Floating ui middlewares to configure position handling, `{ flip: true, shift: true, inline: false }` by default */
  middlewares?: PopoverMiddlewares;

  /** Determines whether component should have an arrow, `false` by default */
  withArrow?: boolean;

  /** Determines whether the overlay should be displayed when the dropdown is opened, `false` by default */
  withOverlay?: boolean;

  /** Props passed down to `Overlay` component */
  overlayProps?: OverlayProps & ElementProps<'div'>;

  /** Arrow size in px, `7` by default */
  arrowSize?: number;

  /** Arrow offset in px, `5` by default */
  arrowOffset?: number;

  /** Arrow `border-radius` in px, `0` by default */
  arrowRadius?: number;

  /** Arrow position */
  arrowPosition?: ArrowPosition;

  /** Determines whether dropdown should be rendered within the `Portal`, `true` by default */
  withinPortal?: boolean;

  /** Props to pass down to the `Portal` when `withinPortal` is true */
  portalProps?: Omit<PortalProps, 'children'>;

  /** Dropdown `z-index`, `300` by default */
  zIndex?: string | number;

  /** Key of `theme.radius` or any valid CSS value to set border-radius, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Key of `theme.shadows` or any other valid CSS `box-shadow` value */
  shadow?: EmpoleonShadow;

  /** If set, popover dropdown will not be rendered */
  disabled?: boolean;

  /** Determines whether focus should be automatically returned to control when dropdown closes, `false` by default */
  returnFocus?: boolean;

  /** Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy), `'absolute'` by default */
  floatingStrategy?: FloatingStrategy;

  /** If set, the dropdown is hidden when the element is hidden with styles or not visible on the screen, `true` by default */
  hideDetached?: boolean;

  /** Prevents popover from flipping/shifting when it the dropdown is visible */
  preventPositionChangeWhenVisible?: boolean;
}

export interface PopoverProps extends __PopoverProps, StylesApiProps<PopoverFactory> {
  __staticSelector?: string;

  /** `Popover.Target` and `Popover.Dropdown` components */
  children?: JSX.Element;

  /** Initial opened state for uncontrolled component */
  defaultOpened?: boolean;

  /** Controlled dropdown opened state */
  opened?: boolean;

  /** Called with current state when dropdown opens or closes */
  onChange?: (opened: boolean) => void;

  /** Determines whether dropdown should be closed on outside clicks, `true` by default */
  closeOnClickOutside?: boolean;

  /** Events that trigger outside clicks */
  clickOutsideEvents?: string[];

  /** Determines whether focus should be trapped within dropdown, `false` by default */
  trapFocus?: boolean;

  /** Determines whether dropdown should be closed when `Escape` key is pressed, `true` by default */
  closeOnEscape?: boolean;

  /** Id base to create accessibility connections */
  id?: string;

  /** Determines whether dropdown and target elements should have accessible roles, `true` by default */
  withRoles?: boolean;
}

export type PopoverFactory = Factory<{
  props: PopoverProps;
  stylesNames: PopoverStylesNames;
  vars: PopoverCssVariables;
}>;

const defaultProps = {
  position: 'bottom',
  offset: 8,
  positionDependencies: [],
  transitionProps: { transition: 'fade', duration: 150 },
  middlewares: { flip: true, shift: true, inline: false },
  arrowSize: 7,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: 'side',
  closeOnClickOutside: true,
  withinPortal: true,
  closeOnEscape: true,
  trapFocus: false,
  withRoles: true,
  returnFocus: false,
  withOverlay: false,
  hideDetached: true,
  clickOutsideEvents: ['mousedown', 'touchstart'],
  zIndex: getDefaultZIndex('popover'),
  __staticSelector: 'Popover',
  width: 'max-content',
} satisfies Partial<PopoverProps>;

const varsResolver = createVarsResolver<PopoverFactory>((_, props) => ({
  dropdown: {
    '--popover-radius': props.radius === undefined ? undefined : getRadius(props.radius),
    '--popover-shadow': getShadow(props.shadow),
  },
}));

export function Popover(_props: PopoverProps) {
  const props = useProps('Popover', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'position',
    'offset',
    'onPositionChange',
    'positionDependencies',
    'opened',
    'transitionProps',
    'onExitTransitionEnd',
    'onEnterTransitionEnd',
    'width',
    'middlewares',
    'withArrow',
    'arrowSize',
    'arrowOffset',
    'arrowRadius',
    'arrowPosition',
    'unstyled',
    'classNames',
    'styles',
    'closeOnClickOutside',
    'withinPortal',
    'portalProps',
    'closeOnEscape',
    'clickOutsideEvents',
    'trapFocus',
    'onClose',
    'onDismiss',
    'onOpen',
    'onChange',
    'zIndex',
    'radius',
    'shadow',
    'id',
    'defaultOpened',
    '__staticSelector',
    'withRoles',
    'disabled',
    'returnFocus',
    'variant',
    'keepMounted',
    'vars',
    'floatingStrategy',
    'withOverlay',
    'overlayProps',
    'hideDetached',
    'attributes',
    'preventPositionChangeWhenVisible',
  ]);

  const getStyles = useStyles<PopoverFactory>({
    name: local.__staticSelector!,
    props,
    classes,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    rootSelector: 'dropdown',
    vars: local.vars,
    varsResolver,
  });

  const { resolvedStyles } = useResolvedStylesApi<PopoverFactory>({ classNames: local.classNames, styles: local.styles, props });

  const [dropdownVisible, setDropdownVisible] = createSignal(local.opened ?? local.defaultOpened ?? false);
  let positionRef: FloatingPosition = local.position!;
  const [arrowRef, setArrowRef] = createSignal<HTMLElement | undefined>(undefined);
  const [targetNode, setTargetNode] = createSignal<HTMLElement | null>(null);
  const [dropdownNode, setDropdownNode] = createSignal<HTMLElement | null>(null);
  const { dir } = useDirection();
  const env = useEmpoleonEnv();

  const uid = useId(local.id);
  const popover = usePopover({
    middlewares: local.middlewares,
    width: local.width,
    position: () => getFloatingPosition(dir, local.position!),
    offset: () => typeof local.offset === 'number' ? local.offset + (local.withArrow ? local.arrowSize! / 2 : 0) : local.offset!,
    arrowRef,
    arrowOffset: local.arrowOffset!,
    onPositionChange: local.onPositionChange,
    positionDependencies: local.positionDependencies,
    opened: () => local.opened,
    defaultOpened: () => local.defaultOpened,
    onChange: local.onChange,
    onOpen: local.onOpen,
    onClose: local.onClose,
    onDismiss: local.onDismiss,
    strategy: local.floatingStrategy,
    dropdownVisible: dropdownVisible(),
    setDropdownVisible,
    positionRef,
    disabled: () => local.disabled,
    preventPositionChangeWhenVisible: local.preventPositionChangeWhenVisible,
    keepMounted: local.keepMounted,
  });

  createEffect(() => {
    const target = targetNode();
    const dropdown = dropdownNode();

    if (!target || !dropdown) {
      return;
    }

    const removeListener = useClickOutside(
      () => {
        if (local.closeOnClickOutside) {
          popover.onClose();
          local.onDismiss?.();
        }
      },
      local.clickOutsideEvents,
      [target, dropdown]
    );

    onCleanup(removeListener);
  });

  const reference = (node: HTMLElement | null) => {
    setTargetNode(node);
    popover.setReference(node);
  };

  const floating = (node: HTMLElement) => {
    setDropdownNode(node);
    popover.setFloating(node);
  };

  const onExited = () => {
    local.transitionProps?.onExited?.();
    local.onExitTransitionEnd?.();
    setDropdownVisible(false);
    positionRef = local.position;
  };

  const onEntered = () => {
    local.transitionProps?.onEntered?.();
    local.onEnterTransitionEnd?.();
  };

  return (
    <PopoverContextProvider
      value={{
        returnFocus: local.returnFocus,
        disabled: () => local.disabled,
        controlled: popover.controlled,
        reference,
        floating,
        x: () => popover.floating().x,
        y: () => popover.floating().y,
        arrowX: () => popover.floating()?.middlewareData?.arrow?.x,
        arrowY: () => popover.floating()?.middlewareData?.arrow?.y,
        opened: popover.opened,
        arrowRef,
        setArrowRef,
        transitionProps: { ...local.transitionProps, onExited, onEntered },
        width: local.width,
        withArrow: () => local.withArrow,
        arrowSize: () => local.arrowSize!,
        arrowOffset: () => local.arrowOffset!,
        arrowRadius: () => local.arrowRadius!,
        arrowPosition: () => local.arrowPosition!,
        placement: () => popover.floating().placement,
        trapFocus: local.trapFocus,
        withinPortal: local.withinPortal,
        portalProps: local.portalProps,
        zIndex: local.zIndex,
        radius: local.radius,
        shadow: local.shadow,
        closeOnEscape: local.closeOnEscape,
        onDismiss: local.onDismiss,
        onClose: popover.onClose,
        onToggle: popover.onToggle,
        getTargetId: () => `${uid}-target`,
        getDropdownId: () => `${uid}-dropdown`,
        withRoles: local.withRoles,
        targetProps: others,
        __staticSelector: local.__staticSelector!,
        classNames: local.classNames,
        styles: local.styles,
        unstyled: local.unstyled,
        variant: local.variant,
        keepMounted: local.keepMounted,
        getStyles,
        resolvedStyles,
        floatingStrategy: local.floatingStrategy,
        referenceHidden:
          local.hideDetached && env !== 'test'
            ? popover.floating().middlewareData.hide?.referenceHidden
            : false,
      }}
    >
      {local.children}
      {local.withOverlay && (
        <Transition
          transition="fade"
          mounted={popover.opened()}
          duration={local.transitionProps?.duration || 250}
          exitDuration={local.transitionProps?.exitDuration || 250}
        >
          {(transitionStyles) => (
            <OptionalPortal withinPortal={local.withinPortal}>
              <Overlay
                {...local.overlayProps}
                {...getStyles('overlay', {
                  className: local.overlayProps?.className,
                  style: [transitionStyles, local.overlayProps?.style],
                })}
              />
            </OptionalPortal>
          )}
        </Transition>
      )}
    </PopoverContextProvider>
  );
}

Popover.Target = PopoverTarget;
Popover.Dropdown = PopoverDropdown;
Popover.displayName = '@empoleon/core/Popover';
Popover.extend = (input: ExtendComponent<PopoverFactory>) => input;
