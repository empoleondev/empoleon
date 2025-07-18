// import { TransitionStatus } from 'solid-transition-group';
import { JSX } from 'solid-js';
import type { NotificationsProps } from './Notifications';

interface NotificationStateStylesProps {
  state: any; /*TransitionStatus;*/
  maxHeight: number | string;
  position: NotificationsProps['position'];
  transitionDuration: number;
}

const transforms = {
  left: 'translateX(-100%)',
  right: 'translateX(100%)',
  'top-center': 'translateY(-100%)',
  'bottom-center': 'translateY(100%)',
};

const noTransform = {
  left: 'translateX(0)',
  right: 'translateX(0)',
  'top-center': 'translateY(0)',
  'bottom-center': 'translateY(0)',
};

export function getNotificationStateStyles({
  state,
  maxHeight,
  position,
  transitionDuration,
}: NotificationStateStylesProps): JSX.CSSProperties {
  const [vertical, horizontal] = position!.split('-');
  const property = (
    horizontal === 'center' ? `${vertical}-center` : horizontal
  ) as keyof typeof transforms;

  const commonStyles: JSX.CSSProperties = {
    opacity: 0,
    'max-height': `${maxHeight}px`,
    transform: transforms[property],
    'transition-duration': `${transitionDuration}ms, ${transitionDuration}ms, ${transitionDuration}ms`,
    'transition-timing-function': 'cubic-bezier(.51,.3,0,1.21), cubic-bezier(.51,.3,0,1.21), linear',
    'transition-property': 'opacity, transform, max-height',
  };

  const inState: JSX.CSSProperties = {
    opacity: 1,
    transform: noTransform[property],
  };

  const outState: JSX.CSSProperties = {
    opacity: 0,
    'max-height': `${maxHeight}px`,
    transform: transforms[property],
  };

  const transitionStyles = {
    entering: inState,
    entered: inState,
    exiting: outState,
    exited: outState,
  };

  return { ...commonStyles, ...transitionStyles[state as keyof typeof transitionStyles] };
}
