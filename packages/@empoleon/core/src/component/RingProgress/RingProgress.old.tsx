import { tests } from '@empoleon-tests/core';
import { RingProgress, RingProgressProps, RingProgressStylesNames } from './RingProgress';

const defaultProps: RingProgressProps = {
  size: 100,
  thickness: 10,
  label: 'test',
  sections: [{ value: 20, color: 'orange' }],
};

describe('@empoleon/core/RingProgress', () => {
  tests.itSupportsSystemProps<RingProgressProps, RingProgressStylesNames>({
    component: RingProgress,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/RingProgress',
    stylesApiSelectors: ['root', 'svg', 'curve', 'label'],
  });
});
