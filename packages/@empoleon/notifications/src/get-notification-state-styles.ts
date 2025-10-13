import { TransitionStatus } from './solid-transition-group';
import { JSX } from 'solid-js';
import type { NotificationsProps } from './Notifications';

interface NotificationStateStylesProps {
  state: TransitionStatus;
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

export function getNotificationStateStyles(props: NotificationStateStylesProps): JSX.CSSProperties {
  const [vertical, horizontal] = props.position!.split('-');
  const property = (
    horizontal === 'center' ? `${vertical}-center` : horizontal
  ) as keyof typeof transforms;

  const commonStyles: JSX.CSSProperties = {
    opacity: 0,
    'max-height': `${props.maxHeight}px`,
    transform: transforms[property],
    'clip-path': 'inset(-30px)',
    'transition-duration': `${props.transitionDuration}ms, ${props.transitionDuration}ms, ${props.transitionDuration}ms`,
    'transition-timing-function':
      'cubic-bezier(.51,.3,0,1.21), cubic-bezier(.51,.3,0,1.21), linear',
    'transition-property': 'opacity, transform, max-height',
  };

  const inState: JSX.CSSProperties = {
    opacity: 1,
    transform: noTransform[property],
  };

  const outState: JSX.CSSProperties = {
    opacity: 0,
    'max-height': 0,
    transform: transforms[property],
  };

  const transitionStyles = {
    entering: inState,
    entered: inState,
    exiting: outState,
    exited: outState,
  };

  return { ...commonStyles, ...transitionStyles[props.state as keyof typeof transitionStyles] };
}
