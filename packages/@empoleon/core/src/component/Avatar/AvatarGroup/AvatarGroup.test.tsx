import { tests } from '@empoleon-tests/core';
import { AvatarGroup, AvatarGroupProps, AvatarGroupStylesNames } from './AvatarGroup';

const defaultProps: AvatarGroupProps = {};

describe('@empoleon/core/AvatarGroup', () => {
  tests.itSupportsSystemProps<AvatarGroupProps, AvatarGroupStylesNames>({
    component: AvatarGroup,
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
    displayName: '@empoleon/core/AvatarGroup',
    stylesApiSelectors: ['group'],
  });
});
