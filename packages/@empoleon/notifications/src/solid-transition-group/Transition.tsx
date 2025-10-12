import {
  Component,
  JSX,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  splitProps,
} from "solid-js";

/** States (match react-transition-group) */
export const UNMOUNTED = "unmounted";
export const EXITED = "exited";
export const ENTERING = "entering";
export const ENTERED = "entered";
export const EXITING = "exiting";

type Timeout = number | { enter?: number; exit?: number; appear?: number };
type NodeRef = { current: Element | null };

export type TransitionProps = {
  in?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  appear?: boolean;
  enter?: boolean;
  exit?: boolean;
  timeout?: Timeout;
  addEndListener?: (nodeOrCallback: any, done?: () => void) => void;
  nodeRef?: NodeRef;
  children: ((state: string, childProps: any) => JSX.Element) | JSX.Element;
  onEnter?: (nodeOrIsAppearing?: any, isAppearing?: boolean) => void;
  onEntering?: (nodeOrIsAppearing?: any, isAppearing?: boolean) => void;
  onEntered?: (nodeOrIsAppearing?: any, isAppearing?: boolean) => void;
  onExit?: (node?: Element) => void;
  onExiting?: (node?: Element) => void;
  onExited?: (node?: Element) => void;
};

const getTimeouts = (timeout?: Timeout) => {
  if (timeout == null) { return { exit: null, enter: null, appear: null } };
  if (typeof timeout === "number") { return { exit: timeout, enter: timeout, appear: timeout } };
  return { exit: timeout.exit ?? 0, enter: timeout.enter ?? 0, appear: timeout.appear ?? timeout.enter ?? 0 };
};

const forceReflow = (node?: Element | null) => node && void (node as HTMLElement).offsetHeight;

export const Transition: Component<TransitionProps> = propsOrig => {
  const [local] = splitProps(propsOrig, [
    "in",
    "mountOnEnter",
    "unmountOnExit",
    "appear",
    "enter",
    "exit",
    "timeout",
    "addEndListener",
    "nodeRef",
    "children",
    "onEnter",
    "onEntering",
    "onEntered",
    "onExit",
    "onExiting",
    "onExited",
  ]);

  const inProp = () => local.in ?? false;
  const mountOnEnter = () => !!local.mountOnEnter;
  const unmountOnExit = () => !!local.unmountOnExit;
  const appear = () => !!local.appear;
  const enter = () => local.enter ?? true;
  const exit = () => local.exit ?? true;

  const initialStatus = (): string => {
    if (inProp()) { return appear() ? EXITED : ENTERED };
    return unmountOnExit() || mountOnEnter() ? UNMOUNTED : EXITED;
  };

  const [status, setStatus] = createSignal<string>(initialStatus());

  let nextCallback: { active: boolean; cb?: (e?: any) => void } | null = null;
  let timerHandle: number | null = null;
  let mounted = false;
  const wrapperRef: HTMLElement | null = null;

  const setNextCallback = (callback?: (e?: any) => void) => {
    let active = true;
    nextCallback = {
      active,
      cb: (e?: any) => {
        if (!active) { return };
        active = false;
        nextCallback = null;
        callback?.(e);
      },
    };
    (nextCallback as any).cancel = () => { active = false; };
    return nextCallback;
  };

  const cancelNextCallback = () => {
    (nextCallback as any)?.cancel?.();
    nextCallback = null;
  };

  const clearTimer = () => {
    if (timerHandle != null) {
      clearTimeout(timerHandle);
      timerHandle = null;
    }
  };

  const resolveNode = (): Element | null => {
    if (local.nodeRef?.current) { return local.nodeRef.current };
    if (wrapperRef) { return (wrapperRef as HTMLElement).firstElementChild ?? wrapperRef  };
    return null;
  };

  const safeSetStatus = (next: string, cb?: () => void) => {
    const callback = setNextCallback(cb)?.cb as (() => void) | undefined;
    setStatus(next);
    callback?.();
  };

  const onTransitionEnd = (timeout: number | null, handler: () => void) => {
    cancelNextCallback();
    setNextCallback(handler);

    const node = resolveNode();
    const noTimeoutOrListener = (timeout == null) && !local.addEndListener;

    if (!node || noTimeoutOrListener) {
      timerHandle = window.setTimeout(() => nextCallback?.cb?.(), 0);
      return;
    }

    if (local.addEndListener) {
      const maybeNode = local.nodeRef ? undefined : node;
      local.addEndListener(maybeNode, nextCallback!.cb!);
    }

    if (timeout != null && timeout > 0) {
      timerHandle = window.setTimeout(() => nextCallback?.cb?.(), timeout);
    }
  };

  const performEnter = (mounting: boolean) => {
    const node = resolveNode();
    const appearing = mounting && appear();
    const timeouts = getTimeouts(local.timeout);
    const enterTimeout = appearing ? timeouts.appear : timeouts.enter;

    if ((!mounting && !enter()) || (enterTimeout == null && !local.addEndListener)) {
      safeSetStatus(ENTERED, () => local.onEntered?.(local.nodeRef ? appearing : node, appearing));
      return;
    }

    local.onEnter?.(local.nodeRef ? appearing : node, appearing);
    safeSetStatus(ENTERING, () => {
      local.onEntering?.(local.nodeRef ? appearing : node, appearing);
      onTransitionEnd(enterTimeout as number, () => {
        safeSetStatus(ENTERED, () => local.onEntered?.(local.nodeRef ? appearing : node, appearing));
      });
    });
  };

  const performExit = () => {
    const node = resolveNode();
    const timeouts = getTimeouts(local.timeout);
    const exitTimeout = timeouts.exit;

    if (!exit() && !local.addEndListener) {
      safeSetStatus(EXITED, () => local.onExited?.(local.nodeRef ? undefined : (node || undefined)));
      return;
    }

    local.onExit?.(local.nodeRef ? undefined : (node || undefined));
    safeSetStatus(EXITING, () => {
      local.onExiting?.(local.nodeRef ? undefined : (node || undefined));
      onTransitionEnd(exitTimeout as number, () => {
        safeSetStatus(EXITED, () => local.onExited?.(local.nodeRef ? undefined : node ?? undefined));
      });
    });
  };

  const updateStatus = (mounting = false, nextStatus: string | null) => {
    if (nextStatus !== null) {
      cancelNextCallback();
      if (nextStatus === ENTERING) {
        const node = resolveNode();
        if ((unmountOnExit() || mountOnEnter()) && node) { forceReflow(node) };
        performEnter(mounting);
      } else {
        performExit();
      }
    } else if (unmountOnExit() && status() === EXITED) {
      setStatus(UNMOUNTED);
    }
  };

  createEffect(() => {
    if (inProp() && status() === UNMOUNTED) { setStatus(EXITED) };
  });

  createEffect(() => {
    const s = status();
    const nextIn = inProp();
    let nextStatus: string | null = null;

    if (nextIn) {
      if (s === EXITING || s === EXITED) { nextStatus = ENTERING };
    } else {
      if (s === ENTERING || s === ENTERED) { nextStatus = EXITING };
    }

    if (!mounted) {
      queueMicrotask(() => {
        mounted = true;
        updateStatus(false, nextStatus);
      });
    } else {
      updateStatus(false, nextStatus);
    }
  });

  onMount(() => {
    mounted = true;
    if (status() === EXITED && inProp() && appear()) {
      updateStatus(true, ENTERING);
    } else {
      updateStatus(true, null);
    }
  });

  onCleanup(() => {
    cancelNextCallback();
    clearTimer();
  });

  const isFunction = typeof local.children === "function";

  if (isFunction) {
    const s = status();
    if (s === UNMOUNTED) { return null };

    return (local.children as any)(s, { transitionState: s });
  }

  const s = status();
  if (s === UNMOUNTED) { return null as any };
  return local.children as JSX.Element;
};

export default Transition;
