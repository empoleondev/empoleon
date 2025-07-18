import { tests } from '@empoleon-tests/core';
import { LoadingOverlay, LoadingOverlayProps, LoadingOverlayStylesNames } from './LoadingOverlay';

const defaultProps: LoadingOverlayProps = {
  visible: true,
};

describe('@empoleon/core/LoadingOverlay', () => {
  tests.itSupportsSystemProps<LoadingOverlayProps, LoadingOverlayStylesNames>({
    component: LoadingOverlay,
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
    displayName: '@empoleon/core/LoadingOverlay',
    stylesApiSelectors: ['root', 'loader', 'overlay'],
  });
});
