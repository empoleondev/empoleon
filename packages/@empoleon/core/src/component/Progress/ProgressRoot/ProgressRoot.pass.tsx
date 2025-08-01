import { tests } from '@empoleon-tests/core';
import { ProgressRoot, ProgressRootProps, ProgressRootStylesNames } from './ProgressRoot';

const defaultProps: ProgressRootProps = {};

describe('@empoleon/core/ProgressRoot', () => {
  tests.itSupportsSystemProps<ProgressRootProps, ProgressRootStylesNames>({
    component: ProgressRoot,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/ProgressRoot',
    stylesApiSelectors: ['root'],
    stylesApiName: 'Progress',
  });
});
