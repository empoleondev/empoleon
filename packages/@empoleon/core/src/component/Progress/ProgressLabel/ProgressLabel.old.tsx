import { createContextContainer, tests } from '@empoleon-tests/core';
import { ProgressRoot } from '../ProgressRoot/ProgressRoot';
import { ProgressLabel, ProgressLabelProps, ProgressLabelStylesNames } from './ProgressLabel';

const TestContainer = createContextContainer(ProgressLabel, ProgressRoot, {});

const defaultProps: ProgressLabelProps = {};

describe('@empoleon/core/ProgressLabel', () => {
  tests.itSupportsSystemProps<ProgressLabelProps, ProgressLabelStylesNames>({
    component: TestContainer,
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
    displayName: '@empoleon/core/ProgressLabel',
    stylesApiSelectors: ['label'],
    stylesApiName: 'Progress',
    selector: '.empoleon-Progress-label',
    compound: true,
    providerStylesApi: false,
  });
});
