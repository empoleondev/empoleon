import { tests } from '@empoleon-tests/core';
import { Mark, MarkProps, MarkStylesNames } from './Mark';

const defaultProps: MarkProps = {};

describe('@empoleon/core/Mark', () => {
  tests.itSupportsSystemProps<MarkProps, MarkStylesNames>({
    component: Mark,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLElement,
    displayName: '@empoleon/core/Mark',
    stylesApiSelectors: ['root'],
  });
});
