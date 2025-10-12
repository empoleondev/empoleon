import { createEffect, createMemo, splitProps, For, createSignal } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getDefaultZIndex,
  OptionalPortal,
  PortalProps,
  rem,
  StylesApiProps,
  useEmpoleonTheme,
  useProps,
  useStyles,
} from '@empoleon/core';
import { useReducedMotion } from '@empoleon/hooks';
import { Transition, TransitionGroup } from './solid-transition-group';
import { getGroupedNotifications } from './get-grouped-notifications/get-grouped-notifications';
import { getNotificationStateStyles } from './get-notification-state-styles';
import { NotificationContainer } from './NotificationContainer';
import {
  hideNotification,
  NotificationPosition,
  notifications,
  NotificationsStore,
  notificationsStore,
  useNotifications,
} from './notifications.store';
import classes from './Notifications.module.css';

export type NotificationsStylesNames = 'root' | 'notification';
export type NotificationsCssVariables = {
  root: '--notifications-z-index' | '--notifications-container-width';
};

export interface NotificationsProps
  extends BoxProps,
    StylesApiProps<NotificationsFactory>,
    ElementProps<'div'> {
  position?: NotificationPosition;
  autoClose?: number | false;
  transitionDuration?: number;
  containerWidth?: number | string;
  notificationMaxHeight?: number | string;
  limit?: number;
  zIndex?: string | number;
  portalProps?: Omit<PortalProps, 'children'>;
  store?: NotificationsStore;
  withinPortal?: boolean;
}

export type NotificationsFactory = Factory<{
  props: NotificationsProps;
  ref: HTMLDivElement;
  stylesNames: NotificationsStylesNames;
  vars: NotificationsCssVariables;
  staticComponents: {
    show: typeof notifications.show;
    hide: typeof notifications.hide;
    update: typeof notifications.update;
    clean: typeof notifications.clean;
    cleanQueue: typeof notifications.cleanQueue;
    updateState: typeof notifications.updateState;
  };
}>;

const defaultProps = {
  position: 'bottom-right',
  autoClose: 4000,
  transitionDuration: 250,
  containerWidth: 440,
  notificationMaxHeight: 200,
  limit: 5,
  zIndex: getDefaultZIndex('overlay'),
  store: notificationsStore,
  withinPortal: true,
} satisfies Partial<NotificationsProps>;

const varsResolver = createVarsResolver<NotificationsFactory>((_, props) => ({
  root: {
    '--notifications-z-index': props.zIndex?.toString(),
    '--notifications-container-width': rem(props.containerWidth),
  },
}));

function kebabToCamelCase(styles: Record<string, any>): Record<string, any> {
  const camelCased: Record<string, any> = {};
  for (const key in styles) {
    /* eslint-disable no-prototype-builtins */
    if (styles.hasOwnProperty(key)) {
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      camelCased[camelKey] = styles[key];
    }
    /* eslint-enable no-prototype-builtins */
  }
  return camelCased;
}

function PositionTransitions(props: {
  notifications: any[];
  position: NotificationPosition;
  duration: number;
  maxHeight: number | string;
  onHide: (id: string) => void;
  autoClose: number | false;
  getStyles: any;
  refs: Record<string, HTMLDivElement>;
}) {
  const entries = new Map<string, { item: any; visible: () => boolean; setVisible: (v: boolean) => void }>();
  const [renderList, setRenderList] = createSignal<string[]>([]);

  createEffect(() => {
    const incoming = props.notifications ?? [];
    const incomingIds = new Set(incoming.map((n) => n.id));

    for (const n of incoming) {
      const id = n.id;
      if (!entries.has(id)) {
        const [visible, setVisible] = createSignal(true);
        entries.set(id, { item: n, visible, setVisible });
      } else {
        const e = entries.get(id)!;
        e.item = n;
        e.setVisible(true);
      }
    }

    for (const [id, e] of entries) {
      if (!incomingIds.has(id) && e.visible()) {
        e.setVisible(false)
      };
    }

    setRenderList(Array.from(entries.keys()));
  });

  const handleExited = (id: string) => {
    entries.delete(id);
    setRenderList((prev) => prev.filter((x) => x !== id));
    delete props.refs[id];
  };

  return (
    <TransitionGroup>
      <For each={renderList()}>
        {(id) => {
          const e = entries.get(id);
          if (!e) { return null };

          const notification = e.item;
          let divRef: HTMLDivElement | undefined;
          const nodeRef = { current: null as HTMLElement | null };
          let hasInitialized = false;
          let isFirstExitedApplication = true;

          const applyStyles = (state: string) => {
            if (!divRef) { return };

            const styles = getNotificationStateStyles({
              state,
              position: props.position,
              transitionDuration: props.duration,
              maxHeight: props.maxHeight,
            });

            const camelStyles = kebabToCamelCase(styles);

            if (state === 'exited' && isFirstExitedApplication) {
              isFirstExitedApplication = false;
              const { transitionDuration, transitionTimingFunction, transitionProperty, ...stylesWithoutTransition } = camelStyles;

              // Only set the specific properties, don't use Object.assign
              for (const [key, value] of Object.entries(stylesWithoutTransition)) {
                divRef.style[key as any] = value;
              }
              divRef.style.transitionDuration = transitionDuration;
              divRef.style.transitionTimingFunction = transitionTimingFunction;
              divRef.style.transitionProperty = transitionProperty;
            } else {
              // Only set the specific properties, don't use Object.assign
              for (const [key, value] of Object.entries(camelStyles)) {
                divRef.style[key as any] = value;
              }
            }
          };

          return (
            <Transition
              appear
              in={e.visible()}
              timeout={props.duration}
              nodeRef={nodeRef}
               onEnter={() => {
                applyStyles('exited');
                if (divRef) { void divRef.offsetHeight };
              }}
              onEntering={() => applyStyles('entering')}
              onEntered={() => applyStyles('entered')}
              onExit={() => applyStyles('entered')}
              onExiting={() => applyStyles('exiting')}
              onExited={() => {
                applyStyles('exited');
                handleExited(notification.id);
              }}
            >
              <div
                ref={(el) => {
                  divRef = el;
                  nodeRef.current = el;
                  props.refs[notification.id] = el;
                  if (!hasInitialized) {
                    hasInitialized = true;
                    applyStyles('exited');
                  }
                }}
                class={props.getStyles('notification').className}
                style={props.getStyles('notification').style()}
              >
                <NotificationContainer
                  data={notification}
                  onHide={props.onHide}
                  autoClose={props.autoClose}
                />
              </div>
            </Transition>
          );
        }}
      </For>
    </TransitionGroup>
  );
}

export const Notifications = factory<NotificationsFactory>((_props) => {
  const props = useProps('Notifications', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'position',
    'autoClose',
    'transitionDuration',
    'containerWidth',
    'notificationMaxHeight',
    'limit',
    'zIndex',
    'store',
    'portalProps',
    'withinPortal',
    'ref',
  ]);

  const theme = useEmpoleonTheme();
  const data = useNotifications(local.store);
  const refs: Record<string, HTMLDivElement> = {};

  const duration = theme.respectReducedMotion && useReducedMotion() ? 1 : local.transitionDuration;

  const getStyles = useStyles<NotificationsFactory>({
    name: 'Notifications',
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

  createEffect(() => {
    local.store?.updateState((current) => ({
      ...current,
      limit: local.limit || 5,
      defaultPosition: local.position!,
    }));
  });

  const grouped = createMemo(() => getGroupedNotifications(data().notifications, local.position!));

  const positions: NotificationPosition[] = ['top-center', 'top-left', 'top-right', 'bottom-right', 'bottom-left', 'bottom-center'];

  return (
    <OptionalPortal withinPortal={local.withinPortal} {...local.portalProps}>
      <For each={positions}>
        {(position) => (
          <Box {...getStyles('root')} data-position={position} ref={position === 'top-center' ? local.ref : undefined} {...others}>
            <PositionTransitions
              notifications={grouped()[position]}
              position={position}
              duration={duration!}
              maxHeight={local.notificationMaxHeight!}
              onHide={(id) => hideNotification(id, local.store)}
              autoClose={local.autoClose!}
              getStyles={getStyles}
              refs={refs}
            />
          </Box>
        )}
      </For>
    </OptionalPortal>
  );
});

Notifications.classes = classes;
Notifications.displayName = '@empoleon/notifications/Notifications';
Notifications.show = notifications.show;
Notifications.hide = notifications.hide;
Notifications.update = notifications.update;
Notifications.clean = notifications.clean;
Notifications.cleanQueue = notifications.cleanQueue;
Notifications.updateState = notifications.updateState;
