import { tests } from '@empoleon-tests/core';
import { RadioIndicator, RadioIndicatorProps, RadioIndicatorStylesNames } from './RadioIndicator';

const defaultProps: RadioIndicatorProps = {};

describe('@empoleon/core/RadioIndicator', () => {
  tests.itSupportsSystemProps<RadioIndicatorProps, RadioIndicatorStylesNames>({
    component: RadioIndicator,
    props: defaultProps,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/RadioIndicator',
    stylesApiSelectors: ['indicator', 'icon'],
  });
});
