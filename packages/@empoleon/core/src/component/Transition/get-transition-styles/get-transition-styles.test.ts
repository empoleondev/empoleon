import { transitions } from '../transitions';
import { getTransitionStyles } from './get-transition-styles';

const customTransition = {
  in: { opacity: 1, backgroundColor: 'red' },
  out: { opacity: 0, backgroundColor: 'blue' },
  common: { color: 'green' },
  transitionProperty: 'color, background-color',
};

const sharedStyles = {
  'transition-duration': '625ms',
  'transition-timing-function': 'ease',
  '--webkit-backface-visibility': 'hidden',
  'will-change': 'transform, opacity',
};

describe('@empoleon/core/Transition/get-transition-styles', () => {
  it('returns predefined transition with string value', () => {
    expect(
      getTransitionStyles({
        transition: 'slide-up',
        state: 'entered',
        duration: 625,
        timingFunction: 'ease',
      })
    ).toStrictEqual({
      ...transitions['slide-up'].in,
      ...transitions['slide-up'].common,
      'transition-property': transitions['slide-up'].transitionProperty,
      ...sharedStyles,
    });

    expect(
      getTransitionStyles({
        transition: 'slide-up',
        state: 'exited',
        duration: 625,
        timingFunction: 'ease',
      })
    ).toStrictEqual({
      ...transitions['slide-up'].out,
      ...transitions['slide-up'].common,
      'transition-property': transitions['slide-up'].transitionProperty,
      ...sharedStyles,
    });
  });

  it('accepts custom transitions', () => {
    expect(
      getTransitionStyles({
        transition: customTransition,
        state: 'entered',
        duration: 625,
        timingFunction: 'ease',
      })
    ).toStrictEqual({
      ...customTransition.in,
      ...customTransition.common,
      'transition-property': customTransition.transitionProperty,
      ...sharedStyles,
    });

    expect(
      getTransitionStyles({
        transition: customTransition,
        state: 'exited',
        duration: 625,
        timingFunction: 'ease',
      })
    ).toStrictEqual({
      ...customTransition.out,
      ...customTransition.common,
      'transition-property': customTransition.transitionProperty,
      ...sharedStyles,
    });
  });
});
