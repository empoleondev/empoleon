import { tests } from '@empoleon-tests/core';
import { Affix, AffixProps, AffixStylesNames } from './Affix';

const defaultProps: AffixProps = {
  withinPortal: false,
};

describe('@empoleon/core/Affix', () => {
  tests.itSupportsSystemProps<AffixProps, AffixStylesNames>({
    component: Affix,
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
    displayName: '@empoleon/core/Affix',
    stylesApiSelectors: ['root'],
  });
});
