import { tests } from '@empoleon-tests/core';
import { Center, CenterProps, CenterStylesNames } from './Center';

const defaultProps: CenterProps = {
  children: <div />,
};

describe('@empoleon/core/Center', () => {
  tests.itSupportsSystemProps<CenterProps, CenterStylesNames>({
    component: Center,
    props: defaultProps,
    mod: true,
    polymorphic: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Center',
    stylesApiSelectors: ['root'],
  });
});
