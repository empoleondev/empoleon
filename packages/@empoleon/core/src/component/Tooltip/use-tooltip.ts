import { createEffect, createSignal, createMemo, Accessor } from 'solid-js';
import {
  arrow,
  flip,
  inline,
  offset,
  shift,
  useDelayGroup,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  type Middleware,
  autoUpdate,
} from '@empoleon/solid-floating-ui';
import { useId } from '@empoleon/hooks';
import {
  FloatingAxesOffsets,
  FloatingPosition,
  FloatingStrategy,
  useFloatingAutoUpdate,
} from '../../utils/Floating';
import { type TooltipMiddlewares } from './Tooltip.types';
import { useTooltipGroupContext } from './TooltipGroup/TooltipGroup.context';

interface UseTooltip {
  position: FloatingPosition;
  closeDelay?: number;
  openDelay?: number;
  onPositionChange?: (position: FloatingPosition) => void;
  opened?: Accessor<boolean>;
  defaultOpened?: boolean;
  offset: number | FloatingAxesOffsets;
  arrowRef?: () => HTMLDivElement | undefined;
  arrowOffset?: number;
  events?: { hover: boolean; focus: boolean; touch: boolean };
  positionDependencies: any[];
  inline?: boolean;
  strategy?: FloatingStrategy;
  middlewares?: TooltipMiddlewares;
}

function getDefaultMiddlewares(middlewares: TooltipMiddlewares | undefined): TooltipMiddlewares {
  if (middlewares === undefined) {
    return { shift: true, flip: true };
  }

  const result = { ...middlewares };
  if (middlewares.shift === undefined) {
    result.shift = true;
  }

  if (middlewares.flip === undefined) {
    result.flip = true;
  }

  return result;
}

function getTooltipMiddlewares(settings: UseTooltip) {
  const middlewaresOptions = getDefaultMiddlewares(settings.middlewares);
  const middlewares: Middleware[] = [offset(settings.offset)];

  if (middlewaresOptions.shift) {
    middlewares.push(
      shift(
        typeof middlewaresOptions.shift === 'boolean'
          ? { padding: 8 }
          : { padding: 8, ...middlewaresOptions.shift }
      )
    );
  }

  if (middlewaresOptions.flip) {
    middlewares.push(
      typeof middlewaresOptions.flip === 'boolean' ? flip() : flip(middlewaresOptions.flip)
    );
  }

  const arrowElement = settings.arrowRef?.();
  if (arrowElement) {
    middlewares.push(arrow({ element: arrowElement, padding: settings.arrowOffset }));
  }

  if (middlewaresOptions.inline) {
    middlewares.push(
      typeof middlewaresOptions.inline === 'boolean' ? inline() : inline(middlewaresOptions.inline)
    );
  } else if (settings.inline) {
    middlewares.push(inline());
  }

  return middlewares;
}

export function useTooltip(settings: UseTooltip) {
  const [uncontrolledOpened, setUncontrolledOpened] = createSignal(settings.defaultOpened);
  const controlled = typeof settings.opened === 'function';
  const withinGroup = useTooltipGroupContext();
  const uid = useId();

  // Normalize `opened` to ALWAYS be an accessor, fixing the "not callable" error.
  const opened = createMemo<boolean>(() => settings.opened ? settings.opened() : uncontrolledOpened() || false);

  // console.log('use-tooltip - settings.defaultOpened:', settings.defaultOpened);
  // console.log('use-tooltip - uncontrolledOpened():', uncontrolledOpened());
  // console.log('use-tooltip - opened():', opened());
  // console.log('use-tooltip - controlled:', controlled);

  const onChange = (_opened: boolean) => {
    if (!controlled) {
      setUncontrolledOpened(_opened);
    }

    if (_opened) {
      setCurrentId(uid);
    }
  };

  const [referenceElement, setReferenceElement] = createSignal<HTMLElement | undefined>(undefined);
  const [floatingElement, setFloatingElement] = createSignal<HTMLElement | undefined>(undefined);

  const floating = useFloating({
    strategy: settings.strategy,
    placement: settings.position,
    open: () => opened(),
    onOpenChange: onChange,
    middleware: () => getTooltipMiddlewares(settings),
    elements: () => ({
      reference: referenceElement(),
      floating: floatingElement(),
    }),
    whileElementsMounted: autoUpdate,
  });

  const { delay: groupDelay, currentId, setCurrentId } = useDelayGroup(() => floating.context, { id: uid });

  const interactions = useInteractions([
    useHover(() => floating.context, () => ({
      enabled: settings.events?.hover,
      delay: withinGroup ? groupDelay : { open: settings.openDelay, close: settings.closeDelay },
      mouseOnly: !settings.events?.touch,
    }))(),

    useFocus(floating.context, {
      enabled: settings.events?.focus,
      visibleOnly: true
    })(),

    useRole(floating.context, { role: 'tooltip' }),

    useDismiss(() => floating.context, {
      enabled: typeof settings.opened === 'undefined',
    }),
  ]);

  useFloatingAutoUpdate({
    opened,
    position: settings.position,
    positionDependencies: settings.positionDependencies || [],
    floating: {
      update: floating.update,
      refs: {
        reference: () => referenceElement() || undefined,
        floating: () => floatingElement() || undefined,
      },
    },
  });

  createEffect(() => {
    settings.onPositionChange?.(floating.placement);
  });

  // Correctly call the accessors to get their boolean/string values.
  const isGroupPhase = opened() && currentId && currentId !== uid;

  return {
    get x() { return floating.x; },
    get y() { return floating.y; },
    get arrowX() { return floating.middlewareData.arrow?.x ?? null; },
    get arrowY() { return floating.middlewareData.arrow?.y ?? null; },
    reference: setReferenceElement,
    floating: setFloatingElement,
    getFloatingProps: interactions.getFloatingProps,
    getReferenceProps: interactions.getReferenceProps,
    isGroupPhase,
    opened,
    get placement() { return floating.placement; },
  };
}
