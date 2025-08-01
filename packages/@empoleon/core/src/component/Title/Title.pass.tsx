import { tests } from '@empoleon-tests/core';
import { Title, TitleProps, TitleStylesNames } from './Title';

const defaultProps: TitleProps = {};

describe('@empoleon/core/Title', () => {
  tests.itSupportsSystemProps<TitleProps, TitleStylesNames>({
    component: Title,
    props: () => defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLHeadingElement,
    displayName: '@empoleon/core/Title',
    stylesApiSelectors: ['root'],
  });
});
