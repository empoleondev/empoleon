import { tests } from '@empoleon-tests/core';
import { Space, SpaceProps } from './Space';

const defaultProps: SpaceProps = {};

describe('@empoleon/core/Space', () => {
  tests.itSupportsSystemProps<SpaceProps>({
    component: Space,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Space',
  });
});
