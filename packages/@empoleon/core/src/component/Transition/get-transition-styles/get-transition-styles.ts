import { JSX, mergeProps } from 'solid-js';
import { EmpoleonTransition, transitions } from '../transitions';

const transitionStatuses = {
  entering: 'in',
  entered: 'in',
  exiting: 'out',
  exited: 'out',
  'pre-exiting': 'out',
  'pre-entering': 'out',
} as const;

export function getTransitionStyles(props: {
  transition: EmpoleonTransition;
  state: keyof typeof transitionStatuses;
  duration: number;
  timingFunction: JSX.CSSProperties['transition-timing-function'];
}): JSX.CSSProperties {
  const shared: JSX.CSSProperties = {
    'backface-visibility': 'hidden',
    'will-change': 'transform, opacity',
    'transition-duration': `${props.duration}ms`,
    'transition-timing-function': props.timingFunction,
  };

  if (typeof props.transition === 'string') {
    if (!(props.transition in transitions)) {
      return {};
    }

    return mergeProps(
      {
        'transition-property': transitions[props.transition].transitionProperty,
        ...shared,
      },
      transitions[props.transition].common,
      transitions[props.transition][transitionStatuses[props.state]]
    );
  }

  return mergeProps({
    'transition-property': props.transition.transitionProperty,
    ...shared,
    ...props.transition.common,
    ...props.transition[transitionStatuses[props.state]],
  });
}
