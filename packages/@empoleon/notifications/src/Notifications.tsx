import {
  Transition as _Transition,
  TransitionGroup,
} from 'solid-transition-group';
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
  RemoveScroll,
  StylesApiProps,
  useEmpoleonTheme,
  useProps,
  useStyles,
} from '@empoleon/core';
import { useReducedMotion } from '@empoleon/hooks';
import {
  getGroupedNotifications,
  positions,
} from './get-grouped-notifications/get-grouped-notifications';
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
import { createEffect, createSignal, For, JSX, splitProps } from 'solid-js';

const Transition: any = _Transition;

export type NotificationsStylesNames = 'root' | 'notification';
export type NotificationsCssVariables = {
  root: '--notifications-z-index' | '--notifications-container-width';
};

export interface NotificationsProps
  extends BoxProps,
    StylesApiProps<NotificationsFactory>,
    ElementProps<'div'> {
  /** Notifications default position, `'bottom-right'` by default */
  position?: NotificationPosition;

  /** Auto close timeout for all notifications in ms, `false` to disable auto close, can be overwritten for individual notifications in `notifications.show` function, `4000` by default */
  autoClose?: number | false;

  /** Notification transition duration in ms, `250` by default */
  transitionDuration?: number;

  /** Notification width, cannot exceed 100%, `440` by default */
  containerWidth?: number | string;

  /** Notification `max-height`, used for transitions, `200` by default */
  notificationMaxHeight?: number | string;

  /** Maximum number of notifications displayed at a time, other new notifications will be added to queue, `5` by default */
  limit?: number;

  /** Notifications container z-index, `400` by default */
  zIndex?: string | number;

  /** Props passed down to the `Portal` component */
  portalProps?: Omit<PortalProps, 'children'>;

  /** Store for notifications state, can be used to create multiple instances of notifications system in your application */
  store?: NotificationsStore;

  /** Determines whether notifications container should be rendered inside `Portal`, `true` by default */
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

const defaultProps: Partial<NotificationsProps> = {
  position: 'bottom-right',
  autoClose: 4000,
  transitionDuration: 250,
  containerWidth: 440,
  notificationMaxHeight: 200,
  limit: 5,
  zIndex: getDefaultZIndex('overlay'),
  store: notificationsStore,
  withinPortal: true,
};

const varsResolver = createVarsResolver<NotificationsFactory>((_, { zIndex, containerWidth }) => ({
  root: {
    '--notifications-z-index': zIndex?.toString(),
    '--notifications-container-width': rem(containerWidth),
  },
}));

export const Notifications = factory<NotificationsFactory>(_props => {
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
    'ref'
  ]);

  const theme = useEmpoleonTheme();
  const data = useNotifications(local.store);
  const [, setForceUpdate] = createSignal(0);
  const forceUpdate = () => setForceUpdate(prev => prev + 1);
  const shouldReduceMotion = useReducedMotion();
  let refs: Record<string, HTMLDivElement> = {};
  let previousLength = 0;

  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const duration = reduceMotion ? 1 : local.transitionDuration;

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

  createEffect(() => {
    const currentLength = data().notifications.length;
    if (previousLength > 0 && currentLength > previousLength) {
      setTimeout(() => forceUpdate(), 0);
    }
    previousLength = currentLength;
  });

  const grouped = getGroupedNotifications(data().notifications, local.position!);
  const groupedComponents = positions.reduce(
  (acc, pos) => {
    acc[pos] = (
      <For each={grouped[pos]}>
        {({ style: notificationStyle, ...notification }) => (
          <Transition
            onEnter={() => refs[notification.id!].offsetHeight}
            appear={true}
            mode="outin"
          >
            <NotificationContainer
              ref={(node) => {
                refs[notification.id!] = node!;
              }}
              data={notification}
              onHide={(id) => hideNotification(id, local.store)}
              autoClose={local.autoClose!}
              {...getStyles('notification', {
                style: {
                  ...getNotificationStateStyles({
                    state: 'entered', // SolidJS transition handles states differently
                    position: pos,
                    transitionDuration: duration!,
                    maxHeight: local.notificationMaxHeight!,
                  }),
                  ...notificationStyle,
                },
              })}
            />
          </Transition>
        )}
      </For>
    );

    return acc;
  },
  {} as Record<NotificationPosition, JSX.Element>
);

  return (
    <OptionalPortal withinPortal={local.withinPortal} {...local.portalProps}>
      <Box {...getStyles('root')} data-position="top-center" ref={local.ref} {...others}>
        <TransitionGroup>{groupedComponents['top-center']}</TransitionGroup>
      </Box>

      <Box {...getStyles('root')} data-position="top-left" {...others}>
        <TransitionGroup>{groupedComponents['top-left']}</TransitionGroup>
      </Box>

      <Box
        {...getStyles('root', { className: RemoveScroll.classNames.fullWidth })}
        data-position="top-right"
        {...others}
      >
        <TransitionGroup>{groupedComponents['top-right']}</TransitionGroup>
      </Box>

      <Box
        {...getStyles('root', { className: RemoveScroll.classNames.fullWidth })}
        data-position="bottom-right"
        {...others}
      >
        <TransitionGroup>{groupedComponents['bottom-right']}</TransitionGroup>
      </Box>

      <Box {...getStyles('root')} data-position="bottom-left" {...others}>
        <TransitionGroup>{groupedComponents['bottom-left']}</TransitionGroup>
      </Box>

      <Box {...getStyles('root')} data-position="bottom-center" {...others}>
        <TransitionGroup>{groupedComponents['bottom-center']}</TransitionGroup>
      </Box>
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
