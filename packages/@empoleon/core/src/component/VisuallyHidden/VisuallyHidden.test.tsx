import { tests } from '@empoleon-tests/core';
import { VisuallyHidden, VisuallyHiddenProps, VisuallyHiddenStylesNames } from './VisuallyHidden';

const defaultProps: VisuallyHiddenProps = {};

describe('@empoleon/core/VisuallyHidden', () => {
  tests.itSupportsSystemProps<VisuallyHiddenProps, VisuallyHiddenStylesNames>({
    component: VisuallyHidden,
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
    refType: HTMLSpanElement,
    displayName: '@empoleon/core/VisuallyHidden',
    stylesApiSelectors: ['root'],
  });
});
