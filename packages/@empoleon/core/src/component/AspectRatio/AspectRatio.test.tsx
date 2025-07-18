import { tests } from '@empoleon-tests/core';
import { AspectRatio, AspectRatioProps, AspectRatioStylesNames } from './AspectRatio';

const defaultProps: AspectRatioProps = {};

describe('@empoleon/core/AspectRatio', () => {
  tests.itSupportsSystemProps<AspectRatioProps, AspectRatioStylesNames>({
    component: AspectRatio,
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
    displayName: '@empoleon/core/AspectRatio',
    stylesApiSelectors: ['root'],
  });
});
