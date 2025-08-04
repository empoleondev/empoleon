// this works for and rest: throws error if children cannot be processed
import { createEffect, createMemo, createSignal, JSX, splitProps, children as getChildren } from 'solid-js';
import { useMergedRef } from '@empoleon/hooks';
import {
  Box,
  createVarsResolver,
  factory,
  Factory,
  getDefaultZIndex,
  getRadius,
  getRefProp,
  getThemeColor,
  useDirection,
  useProps,
  useStyles,
} from '../../core';
import {
  ArrowPosition,
  FloatingArrow,
  FloatingAxesOffsets,
  FloatingPosition,
  FloatingStrategy,
  getFloatingPosition,
} from '../../utils/Floating';
import { OptionalPortal } from '../Portal';
import { getTransitionProps, Transition, TransitionOverride } from '../Transition';
import { TooltipBaseProps, TooltipCssVariables, TooltipStylesNames } from './Tooltip.types';
import { TooltipFloating } from './TooltipFloating/TooltipFloating';
import { TooltipGroup } from './TooltipGroup/TooltipGroup';
import { useTooltip } from './use-tooltip';
import classes from './Tooltip.module.css';

export interface TooltipProps extends Omit<TooltipBaseProps, 'children'> {
  /** Called when tooltip position changes */
  onPositionChange?: (position: FloatingPosition) => void;

  /** Open delay in ms */
  openDelay?: number;

  /** Close delay in ms, `0` by default */
  closeDelay?: number;

  /** Controlled opened state */
  opened?: boolean;

  /** Uncontrolled tooltip initial opened state */
  defaultOpened?: boolean;

  /** Space between target element and tooltip in px, `5` by default */
  offset?: number | FloatingAxesOffsets;

  /** Determines whether the tooltip should have an arrow, `false` by default */
  withArrow?: boolean;

  /** Arrow size in px, `4` by default */
  arrowSize?: number;

  /** Arrow offset in px, `5` by default */
  arrowOffset?: number;

  /** Arrow `border-radius` in px, `0` by default */
  arrowRadius?: number;

  /** Arrow position relative to the tooltip, `side` by default */
  arrowPosition?: ArrowPosition;

  /** Props passed down to the `Transition` component that used to animate tooltip presence, use to configure duration and animation type, `{ duration: 100, transition: 'fade' }` by default */
  transitionProps?: TransitionOverride;

  /** Determines which events will be used to show tooltip, `{ hover: true, focus: false, touch: false }` by default */
  events?: { hover: boolean; focus: boolean; touch: boolean };

  /** `useEffect` dependencies to force update tooltip position */
  positionDependencies?: any[];

  /** Must be set if the tooltip target is an inline element */
  inline?: boolean;

  /** If set, the tooltip will not be unmounted from the DOM when it is hidden, `display: none` styles will be applied instead */
  keepMounted?: boolean;

  /** Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy), `'absolute'` by default */
  floatingStrategy?: FloatingStrategy;

  children: (props: Record<string, any>) => JSX.Element;
}

export type TooltipFactory = Factory<{
  props: TooltipProps;
  ref: HTMLDivElement;
  stylesNames: TooltipStylesNames;
  vars: TooltipCssVariables;
  staticComponents: {
    Floating: typeof TooltipFloating;
    Group: typeof TooltipGroup;
  };
}>;

const defaultProps: Partial<TooltipProps> = {
  position: 'top',
  refProp: 'ref',
  withinPortal: true,
  inline: false,
  defaultOpened: false,
  arrowSize: 4,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: 'side',
  offset: 5,
  transitionProps: { duration: 100, transition: 'fade' },
  events: { hover: true, focus: false, touch: false },
  zIndex: getDefaultZIndex('popover'),
  positionDependencies: [],
  middlewares: { flip: true, shift: true, inline: false },
};

const varsResolver = createVarsResolver<TooltipFactory>((theme, { radius, color }) => ({
  tooltip: {
    '--tooltip-radius': radius === undefined ? undefined : getRadius(radius),
    '--tooltip-bg': color ? getThemeColor(color, theme) : undefined,
    '--tooltip-color': color ? 'var(--empoleon-color-white)' : undefined,
  },
}));

export const Tooltip = factory<TooltipFactory>(_props => {
  const props = useProps('Tooltip', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'position',
    'refProp',
    'label',
    'openDelay',
    'closeDelay',
    'onPositionChange',
    'opened',
    'defaultOpened',
    'withinPortal',
    'radius',
    'color',
    'classNames',
    'styles',
    'unstyled',
    'style',
    'className',
    'withArrow',
    'arrowSize',
    'arrowOffset',
    'arrowRadius',
    'arrowPosition',
    'offset',
    'transitionProps',
    'multiline',
    'events',
    'zIndex',
    'disabled',
    'positionDependencies',
    'onClick',
    'onMouseEnter',
    'onMouseLeave',
    'inline',
    'variant',
    'keepMounted',
    'vars',
    'portalProps',
    'mod',
    'floatingStrategy',
    'middlewares',
    'onMouseMove',
    'onPointerDown',
    'onPointerEnter',
    'ref'
  ]);

  const { dir } = useDirection();
  const [arrowRef, setArrowRef] = createSignal<HTMLDivElement>();

  if (typeof props.children !== 'function') {
    const safe = getChildren(() => props.children as unknown as JSX.Element);
    const resolved = safe();

    // If more than one top‑level node, or primitive, reject
    if (!resolved || Array.isArray(resolved) || typeof resolved === 'string' || typeof resolved === 'number') {
      throw new Error(
        '[@empoleon/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported'
      );
    }
  }

  const tooltip = useTooltip({
    position: getFloatingPosition(dir, local.position!),
    closeDelay: local.closeDelay,
    openDelay: local.openDelay,
    onPositionChange: local.onPositionChange,
    opened: local.opened === undefined ? undefined : () => !!local.opened,
    defaultOpened: local.defaultOpened,
    events: local.events,
    arrowRef: () => arrowRef(),
    arrowOffset: local.arrowOffset,
    offset: typeof local.offset === 'number' ? local.offset! + (local.withArrow ? local.arrowSize! / 2 : 0) : local.offset!,
    positionDependencies: [...local.positionDependencies!, props.children],
    inline: local.inline,
    strategy: local.floatingStrategy,
    middlewares: local.middlewares,
  });

  const getStyles = useStyles<TooltipFactory>({
    name: 'Tooltip',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    rootSelector: 'tooltip',
    vars: local.vars,
    varsResolver,
  });

  const targetRef = useMergedRef(tooltip.reference, getRefProp(props.children), local.ref);
  const transition = getTransitionProps(local.transitionProps, { duration: 100, transition: 'fade' });

  const coords = createMemo(() => ({
    top: `${tooltip.y ?? 0}px`,
    left: `${tooltip.x ?? 0}px`,
  }));

  return (
    <>
      <OptionalPortal {...local.portalProps} withinPortal={local.withinPortal}>
        <Transition
          {...transition}
          keepMounted={local.keepMounted}
          mounted={!local.disabled && !!tooltip.opened()}
          duration={tooltip.isGroupPhase ? 10 : transition.duration}
        >
          {(transitionStyles) => (
            <Box
              {...others}
              data-fixed={local.floatingStrategy === 'fixed' || undefined}
              variant={local.variant}
              mod={[{ multiline: local.multiline }, local.mod]}
              {...tooltip.getFloatingProps({
                ref: tooltip.floating,
                class: getStyles('tooltip').className,
                style: {
                  ...getStyles('tooltip').style,
                  ...transitionStyles,
                  ['z-index']: local.zIndex as JSX.CSSProperties['z-index'],
                  ...coords(),
                },
              })}
            >
              {local.label}

              <FloatingArrow
                ref={setArrowRef}
                arrowX={tooltip.arrowX!}
                arrowY={tooltip.arrowY!}
                visible={local.withArrow!}
                position={tooltip.placement!}
                arrowSize={local.arrowSize!}
                arrowOffset={local.arrowOffset!}
                arrowRadius={local.arrowRadius!}
                arrowPosition={local.arrowPosition!}
                {...getStyles('arrow')}
              />
            </Box>
          )}
        </Transition>
      </OptionalPortal>

      {typeof props.children === 'function'
      ? props.children({
          ref: targetRef,
          class: local.className,
          ...tooltip.getReferenceProps(local as any),
        })
      : props.children}
    </>
  );
});

Tooltip.classes = classes;
Tooltip.displayName = '@empoleon/core/Tooltip';
Tooltip.Floating = TooltipFloating;
Tooltip.Group = TooltipGroup;

// this works for: tests.itSupportsSystemProps<TooltipProps, TooltipStylesNames
// import { createEffect, createMemo, createSignal, JSX, splitProps, children as getChildren, cloneElement } from 'solid-js';
// import { useMergedRef } from '@empoleon/hooks';
// import {
//   Box,
//   createVarsResolver,
//   factory,
//   Factory,
//   getDefaultZIndex,
//   getRadius,
//   getRefProp,
//   getThemeColor,
//   useDirection,
//   useProps,
//   useStyles,
// } from '../../core';
// import {
//   ArrowPosition,
//   FloatingArrow,
//   FloatingAxesOffsets,
//   FloatingPosition,
//   FloatingStrategy,
//   getFloatingPosition,
// } from '../Floating';
// import { OptionalPortal } from '../Portal';
// import { getTransitionProps, Transition, TransitionOverride } from '../Transition';
// import { TooltipBaseProps, TooltipCssVariables, TooltipStylesNames } from './Tooltip.types';
// import { TooltipFloating } from './TooltipFloating/TooltipFloating';
// import { TooltipGroup } from './TooltipGroup/TooltipGroup';
// import { useTooltip } from './use-tooltip';
// import classes from './Tooltip.module.css';

// export interface TooltipProps extends Omit<TooltipBaseProps, 'children'> {
//   /** Called when tooltip position changes */
//   onPositionChange?: (position: FloatingPosition) => void;

//   /** Open delay in ms */
//   openDelay?: number;

//   /** Close delay in ms, `0` by default */
//   closeDelay?: number;

//   /** Controlled opened state */
//   opened?: boolean;

//   /** Uncontrolled tooltip initial opened state */
//   defaultOpened?: boolean;

//   /** Space between target element and tooltip in px, `5` by default */
//   offset?: number | FloatingAxesOffsets;

//   /** Determines whether the tooltip should have an arrow, `false` by default */
//   withArrow?: boolean;

//   /** Arrow size in px, `4` by default */
//   arrowSize?: number;

//   /** Arrow offset in px, `5` by default */
//   arrowOffset?: number;

//   /** Arrow `border-radius` in px, `0` by default */
//   arrowRadius?: number;

//   /** Arrow position relative to the tooltip, `side` by default */
//   arrowPosition?: ArrowPosition;

//   /** Props passed down to the `Transition` component that used to animate tooltip presence, use to configure duration and animation type, `{ duration: 100, transition: 'fade' }` by default */
//   transitionProps?: TransitionOverride;

//   /** Determines which events will be used to show tooltip, `{ hover: true, focus: false, touch: false }` by default */
//   events?: { hover: boolean; focus: boolean; touch: boolean };

//   /** `useEffect` dependencies to force update tooltip position */
//   positionDependencies?: any[];

//   /** Must be set if the tooltip target is an inline element */
//   inline?: boolean;

//   /** If set, the tooltip will not be unmounted from the DOM when it is hidden, `display: none` styles will be applied instead */
//   keepMounted?: boolean;

//   /** Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy), `'absolute'` by default */
//   floatingStrategy?: FloatingStrategy;

//   children: (props: Record<string, any>) => JSX.Element;
// }

// export type TooltipFactory = Factory<{
//   props: TooltipProps;
//   ref: HTMLDivElement;
//   stylesNames: TooltipStylesNames;
//   vars: TooltipCssVariables;
//   staticComponents: {
//     Floating: typeof TooltipFloating;
//     Group: typeof TooltipGroup;
//   };
// }>;

// const defaultProps: Partial<TooltipProps> = {
//   position: 'top',
//   refProp: 'ref',
//   withinPortal: true,
//   inline: false,
//   defaultOpened: false,
//   arrowSize: 4,
//   arrowOffset: 5,
//   arrowRadius: 0,
//   arrowPosition: 'side',
//   offset: 5,
//   transitionProps: { duration: 100, transition: 'fade' },
//   events: { hover: true, focus: false, touch: false },
//   zIndex: getDefaultZIndex('popover'),
//   positionDependencies: [],
//   middlewares: { flip: true, shift: true, inline: false },
// };

// const varsResolver = createVarsResolver<TooltipFactory>((theme, { radius, color }) => ({
//   tooltip: {
//     '--tooltip-radius': radius === undefined ? undefined : getRadius(radius),
//     '--tooltip-bg': color ? getThemeColor(color, theme) : undefined,
//     '--tooltip-color': color ? 'var(--empoleon-color-white)' : undefined,
//   },
// }));

// export const Tooltip = factory<TooltipFactory>(_props => {
//   const props = useProps('Tooltip', defaultProps, _props);

//   const [local, others] = splitProps(props, [
//     'position',
//     'refProp',
//     'label',
//     'openDelay',
//     'closeDelay',
//     'onPositionChange',
//     'opened',
//     'defaultOpened',
//     'withinPortal',
//     'radius',
//     'color',
//     'classNames',
//     'styles',
//     'unstyled',
//     'style',
//     'className',
//     'withArrow',
//     'arrowSize',
//     'arrowOffset',
//     'arrowRadius',
//     'arrowPosition',
//     'offset',
//     'transitionProps',
//     'multiline',
//     'events',
//     'zIndex',
//     'disabled',
//     'positionDependencies',
//     'onClick',
//     'onMouseEnter',
//     'onMouseLeave',
//     'inline',
//     'variant',
//     'keepMounted',
//     'vars',
//     'portalProps',
//     'mod',
//     'floatingStrategy',
//     'middlewares',
//     'onMouseMove',
//     'onPointerDown',
//     'onPointerEnter',
//     'ref'
//   ]);

//   const { dir } = useDirection();
//   const [arrowRef, setArrowRef] = createSignal<HTMLDivElement>();

//   const tooltip = useTooltip({
//     position: getFloatingPosition(dir, local.position!),
//     closeDelay: local.closeDelay,
//     openDelay: local.openDelay,
//     onPositionChange: local.onPositionChange,
//     opened: local.opened === undefined ? undefined : () => !!local.opened,
//     defaultOpened: local.defaultOpened,
//     events: local.events,
//     arrowRef: () => arrowRef(),
//     arrowOffset: local.arrowOffset,
//     offset: typeof local.offset === 'number' ? local.offset! + (local.withArrow ? local.arrowSize! / 2 : 0) : local.offset!,
//     positionDependencies: [...local.positionDependencies!, props.children],
//     inline: local.inline,
//     strategy: local.floatingStrategy,
//     middlewares: local.middlewares,
//   });

//   const getStyles = useStyles<TooltipFactory>({
//     name: 'Tooltip',
//     props,
//     classes,
//     className: local.className,
//     style: local.style,
//     classNames: local.classNames,
//     styles: local.styles,
//     unstyled: local.unstyled,
//     rootSelector: 'tooltip',
//     vars: local.vars,
//     varsResolver,
//   });

//   const targetRef = useMergedRef(tooltip.reference, getRefProp(props.children), local.ref);
//   const transition = getTransitionProps(local.transitionProps, { duration: 100, transition: 'fade' });

//   const coords = createMemo(() => ({
//     top: `${tooltip.y ?? 0}px`,
//     left: `${tooltip.x ?? 0}px`,
//   }));

//   return (
//     <>
//       <OptionalPortal {...local.portalProps} withinPortal={local.withinPortal}>
//         <Transition
//           {...transition}
//           keepMounted={local.keepMounted}
//           mounted={!local.disabled && !!tooltip.opened()}
//           duration={tooltip.isGroupPhase ? 10 : transition.duration}
//         >
//           {(transitionStyles) => (
//             <Box
//               {...others}
//               data-fixed={local.floatingStrategy === 'fixed' || undefined}
//               variant={local.variant}
//               mod={[{ multiline: local.multiline }, local.mod]}
//               {...tooltip.getFloatingProps({
//                 ref: tooltip.floating,
//                 class: getStyles('tooltip').className,
//                 style: {
//                   ...getStyles('tooltip').style,
//                   ...transitionStyles,
//                   ['z-index']: local.zIndex as JSX.CSSProperties['z-index'],
//                   ...coords(),
//                 },
//               })}
//             >
//               {local.label}

//               <FloatingArrow
//                 ref={setArrowRef}
//                 arrowX={tooltip.arrowX!}
//                 arrowY={tooltip.arrowY!}
//                 visible={local.withArrow!}
//                 position={tooltip.placement!}
//                 arrowSize={local.arrowSize!}
//                 arrowOffset={local.arrowOffset!}
//                 arrowRadius={local.arrowRadius!}
//                 arrowPosition={local.arrowPosition!}
//                 {...getStyles('arrow')}
//               />
//             </Box>
//           )}
//         </Transition>
//       </OptionalPortal>

//       {(() => {
//         console.log('Tooltip Debug - Rendering children:');
//         console.log('  props.children:', props.children);
//         console.log('  typeof props.children:', typeof props.children);

//         // Always use props.children to avoid system props interference
//         if (typeof props.children === 'function') {
//           console.log('  Rendering function children');
//           const result = props.children({
//             ref: targetRef,
//             class: local.className,
//             ...tooltip.getReferenceProps(local as any),
//             ...others, // Pass system props to function children
//           });
//           console.log('  Function children result:', result);
//           return result;
//         }

//         console.log('  Rendering direct children:', props.children);
//         console.log('  System props (others):', others);

//         // In SolidJS, we can't clone JSX elements like in React
//         // Instead, we need to wrap the children in a Box that can handle system props
//         if (props.children) {
//           return (
//             <Box
//               {...others}
//               ref={targetRef}
//               class={local.className}
//               {...tooltip.getReferenceProps(local as any)}
//             >
//               {props.children}
//             </Box>
//           );
//         }

//         // Fallback: create a wrapper element with system props if no children
//         return (
//           <Box
//             {...others}
//             ref={targetRef}
//             class={local.className}
//             {...tooltip.getReferenceProps(local as any)}
//           />
//         );
//       })()}
//     </>
//   );
// });

// Tooltip.classes = classes;
// Tooltip.displayName = '@empoleon/core/Tooltip';
// Tooltip.Floating = TooltipFloating;
// Tooltip.Group = TooltipGroup;
