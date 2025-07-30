import { tests } from '@empoleon-tests/core';
import { Kbd, KbdProps, KbdStylesNames } from './Kbd';

const defaultProps: KbdProps = {};

describe('@empoleon/core/Kbd', () => {
  tests.itSupportsSystemProps<KbdProps, KbdStylesNames>({
    component: Kbd,
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
    refType: HTMLElement,
    displayName: '@empoleon/core/Kbd',
    stylesApiSelectors: ['root'],
  });
});
