import { createEffect, createSignal, For, splitProps, createMemo } from 'solid-js';
import { createListTransition } from '@solid-primitives/transition-group';
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

const varsResolver = createVarsResolver<NotificationsFactory>((_, { zIndex, containerWidth }) => ({
  root: {
    '--notifications-z-index': zIndex?.toString(),
    '--notifications-container-width': rem(containerWidth),
  },
}));

// Position-specific transition component with full debugging
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
  const [notificationRefs, setNotificationRefs] = createSignal<HTMLElement[]>([]);

  const trackElement = (el: HTMLElement, id: string) => {
    props.refs[id] = el as HTMLDivElement;

    setNotificationRefs(prev => {
      const newRefs = [...prev];
      if (!newRefs.includes(el)) {
        newRefs.push(el);
      }
      return newRefs;
    });
  };

  // Update refs when notifications change
  createEffect(() => {
    const currentRefs: HTMLElement[] = [];
    props.notifications.forEach(notification => {
      const existingRef = props.refs[notification.id];
      if (existingRef) {
        currentRefs.push(existingRef);
      }
    });

    setNotificationRefs(currentRefs);
  });

  createListTransition(notificationRefs, {
    appear: true,
    onChange({ list, added, removed, unchanged, finishRemoved }) {
      added.forEach((el, i) => {
        const id = el.getAttribute('data-notification-id');
      });

      removed.forEach((el, i) => {
        const id = el.getAttribute('data-notification-id');
      });

      if (added.length > 0) {
        queueMicrotask(() => {
          added.forEach((el, i) => {
            const id = el.getAttribute('data-notification-id');

            // Figure direction and start position
            const isRight = props.position.includes('right');
            const isLeft = props.position.includes('left');
            const isTop = props.position.includes('top');
            const isBottom = props.position.includes('bottom');

            // Start off-screen in the direction the notification comes from
            let startTransform;
            if (isRight) {
              startTransform = 'translateX(100%)';
            } else if (isLeft) {
              startTransform = 'translateX(-100%)';
            } else if (isTop) {
              startTransform = 'translateY(-100%)';
            } else if (isBottom) {
              startTransform = 'translateY(100%)';
            } else {
              // Default center - slide from above
              startTransform = 'translateY(-100%)';
            }

            // Apply initial state - off-screen
            el.style.transform = startTransform;
            el.style.opacity = '1';
            el.style.willChange = 'transform';

            // Force reflow
            void el.offsetHeight;

            // Phase 1: Slide to final position first
            el.style.transition = `transform ${props.duration * 0.6}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                // First go to the final position, then add a small overshoot
                el.style.transform = 'translateX(0) translateY(0)';

                // Wait for that transition, then add the small overshoot
                const onReachFinalPosition = () => {
                  el.removeEventListener('transitionend', onReachFinalPosition);

                  // Now add a small overshoot
                  el.style.transition = `transform ${props.duration * 0.15}ms ease-out`;

                  let overshootTransform;
                  if (isRight) {
                    overshootTransform = 'translateX(-22px)'; // Overshoot left
                  } else if (isLeft) {
                    overshootTransform = 'translateX(22px)'; // Overshoot right
                  } else if (isTop) {
                    overshootTransform = 'translateY(22px)'; // Overshoot down
                  } else if (isBottom) {
                    overshootTransform = 'translateY(-22px)'; // Overshoot up
                  } else {
                    overshootTransform = 'translateY(22px)'; // Default overshoot down
                  }

                  el.style.transform = overshootTransform;


                  // Phase 3: Bounce back to final position
                  const onOvershootEnd = () => {
                    el.removeEventListener('transitionend', onOvershootEnd);

                    el.style.transition = `transform ${props.duration * 0.25}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
                    el.style.transform = 'translateX(0) translateY(0)';

                    const onFinalTransitionEnd = (ev: any) => {
                      if (ev.target !== el) return;
                      el.removeEventListener('transitionend', onFinalTransitionEnd);
                      el.style.transition = '';
                      el.style.willChange = '';

                      el.classList.remove(`notification-${props.position}-enter`);
                      el.classList.add(`notification-${props.position}-entered`);
                    };
                    el.addEventListener('transitionend', onFinalTransitionEnd);
                  };

                  el.addEventListener('transitionend', onOvershootEnd);
                };

                el.addEventListener('transitionend', onReachFinalPosition);
              });
            });
          });
        });
      }



      if (removed.length > 0) {
        removed.forEach((el, i) => {
          const id = el.getAttribute('data-notification-id');

          el.style.transition = `all ${props.duration}ms ease-out`;
          el.classList.remove(`notification-${props.position}-entered`);
          el.classList.add(`notification-${props.position}-exit`);
        });

        setTimeout(() => {
          finishRemoved(removed);
        }, props.duration);
      } else {
        finishRemoved(removed);
      }
    },
  });

  return (
    <For each={props.notifications}>
      {({ style: notificationStyle, ...notification }) => {
        return (
          <div
            ref={(el) => trackElement(el, notification.id)}
            data-notification-id={notification.id}
            {...props.getStyles('notification', {
              style: {
                ...getNotificationStateStyles({
                  state: 'entered',
                  position: props.position,
                  transitionDuration: props.duration,
                  maxHeight: props.maxHeight,
                }),
                ...notificationStyle,
              },
            })}
          >
            <NotificationContainer
              data={notification}
              onHide={(id) => {
                props.onHide(id);
              }}
              autoClose={props.autoClose}
            />
          </div>
        );
      }}
    </For>
  );
}

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
  const shouldReduceMotion = useReducedMotion();
  let refs: Record<string, HTMLDivElement> = {};

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

  const grouped = () => {
    const result = getGroupedNotifications(data().notifications, local.position!);
    return result;
  };

  return (
    <OptionalPortal withinPortal={local.withinPortal} {...local.portalProps}>
      <Box
        {...getStyles('root')}
        data-position="top-center"
        ref={local.ref}
        {...others}
      >
        <PositionTransitions
          notifications={grouped()['top-center']}
          position="top-center"
          duration={duration!}
          maxHeight={local.notificationMaxHeight!}
          onHide={(id) => hideNotification(id, local.store)}
          autoClose={local.autoClose!}
          getStyles={getStyles}
          refs={refs}
        />
      </Box>

      <Box
        {...getStyles('root')}
        data-position="top-left"
        {...others}
      >
        <PositionTransitions
          notifications={grouped()['top-left']}
          position="top-left"
          duration={duration!}
          maxHeight={local.notificationMaxHeight!}
          onHide={(id) => hideNotification(id, local.store)}
          autoClose={local.autoClose!}
          getStyles={getStyles}
          refs={refs}
        />
      </Box>

      <Box
        {...getStyles('root')}
        data-position="top-right"
        {...others}
      >
        <PositionTransitions
          notifications={grouped()['top-right']}
          position="top-right"
          duration={duration!}
          maxHeight={local.notificationMaxHeight!}
          onHide={(id) => hideNotification(id, local.store)}
          autoClose={local.autoClose!}
          getStyles={getStyles}
          refs={refs}
        />
      </Box>

      <Box
        {...getStyles('root')}
        data-position="bottom-right"
        {...others}
      >
        <PositionTransitions
          notifications={grouped()['bottom-right']}
          position="bottom-right"
          duration={duration!}
          maxHeight={local.notificationMaxHeight!}
          onHide={(id) => hideNotification(id, local.store)}
          autoClose={local.autoClose!}
          getStyles={getStyles}
          refs={refs}
        />
      </Box>

      <Box
        {...getStyles('root')}
        data-position="bottom-left"
        {...others}
      >
        <PositionTransitions
          notifications={grouped()['bottom-left']}
          position="bottom-left"
          duration={duration!}
          maxHeight={local.notificationMaxHeight!}
          onHide={(id) => hideNotification(id, local.store)}
          autoClose={local.autoClose!}
          getStyles={getStyles}
          refs={refs}
        />
      </Box>

      <Box
        {...getStyles('root')}
        data-position="bottom-center"
        {...others}
      >
        <PositionTransitions
          notifications={grouped()['bottom-center']}
          position="bottom-center"
          duration={duration!}
          maxHeight={local.notificationMaxHeight!}
          onHide={(id) => hideNotification(id, local.store)}
          autoClose={local.autoClose!}
          getStyles={getStyles}
          refs={refs}
        />
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
