import { JSX, Show, splitProps } from 'solid-js';
import { Transition as SolidTransition } from 'solid-transition-group';
import { useEmpoleonEnv } from '../../core';
import { getTransitionStyles } from './get-transition-styles/get-transition-styles';
import type { EmpoleonTransition } from './transitions';

export interface TransitionProps {
  /** If set, the element is not unmounted from the DOM when hidden, `display: none` styles are applied instead */
  keepMounted?: boolean;

  /** Transition name or object */
  transition?: EmpoleonTransition;

  /** Transition duration in ms @default `250` */
  duration?: number;

  /** Exit transition duration in ms @default `250` */
  exitDuration?: number;

  /** Transition timing function @default `theme.transitionTimingFunction` */
  timingFunction?: string;

  /** Determines whether component should be mounted to the DOM */
  mounted: boolean;

  /** Render function with transition styles argument */
  children: (styles: JSX.CSSProperties) => JSX.Element;

  /** Called when exit transition ends */
  onExited?: () => void;

  /** Called when exit transition starts */
  onExit?: () => void;

  /** Called when enter transition starts */
  onEnter?: () => void;

  /** Called when enter transition ends */
  onEntered?: () => void;

  /** Delay in ms before enter transition starts */
  enterDelay?: number;

  /** Delay in ms before exit transition starts */
  exitDelay?: number;
}

export type TransitionOverride = Partial<Omit<TransitionProps, 'mounted'>>;

export function Transition(props: TransitionProps) {
  const env = useEmpoleonEnv();
  const [local] = splitProps(props, [
    'keepMounted',
    'transition',
    'duration',
    'exitDuration',
    'timingFunction',
    'mounted',
    'children',
    'onExited',
    'onExit',
    'onEnter',
    'onEntered',
    'enterDelay',
    'exitDelay',
  ]);

  const duration = local.duration ?? 250;
  const exitDuration = local.exitDuration ?? duration;
  const timingFunction = local.timingFunction ?? 'ease';

  const mkStyles = (state: Parameters<typeof getTransitionStyles>[0]['state'], dur: number) =>
    getTransitionStyles({
      transition: local.transition ?? 'fade',
      state,
      duration: dur,
      timingFunction,
    });

  function animate(
    el: HTMLElement,
    fromState: Parameters<typeof getTransitionStyles>[0]['state'],
    toState: Parameters<typeof getTransitionStyles>[0]['state'],
    dur: number,
    cb?: () => void
  ) {
    const from = mkStyles(fromState, dur);
    const to = mkStyles(toState, dur);
    Object.assign(el.style, from);
    void el.offsetHeight;
    Object.assign(el.style, { transition: `all ${dur}ms ${timingFunction}`, ...to });
    if (cb) {setTimeout(cb, dur)};
  }

  // No-animation fallback
  if (env === 'test' || (duration === 0 && exitDuration === 0)) {
    return (
      <Show when={local.mounted || local.keepMounted} fallback={null}>
        {local.children(local.mounted ? {} : { display: 'none' })}
      </Show>
    );
  }

  return (
    <SolidTransition
      appear
      mode="inout"
      onBeforeEnter={(el) =>
        el instanceof HTMLElement && Object.assign(el.style, mkStyles('pre-entering', duration))
      }
      onEnter={(el, done) => {
        if (!(el instanceof HTMLElement)) {return done()};
        local.onEnter?.();
        animate(el, 'pre-entering', 'entering', duration, () => {
          local.onEntered?.();
          done();
        });
      }}
      onAfterEnter={(el) =>
        el instanceof HTMLElement && Object.assign(el.style, mkStyles('entered', duration))
      }
      onBeforeExit={(el) =>
        el instanceof HTMLElement && Object.assign(el.style, mkStyles('pre-exiting', exitDuration))
      }
      onExit={(el, done) => {
        if (!(el instanceof HTMLElement)) {return done()};
        local.onExit?.();
        animate(el, 'exiting', 'exiting', exitDuration, () => {
          local.onExited?.();
          done();
        });
      }}
      onAfterExit={(el) =>
        el instanceof HTMLElement && Object.assign(el.style, mkStyles('exited', exitDuration))
      }
    >
      <Show when={local.mounted || local.keepMounted} fallback={null}>
        {local.children(local.mounted ? mkStyles('entered', duration) : { display: 'none' })}
      </Show>
    </SolidTransition>
  );
}

Transition.displayName = '@empoleon/core/Transition';
