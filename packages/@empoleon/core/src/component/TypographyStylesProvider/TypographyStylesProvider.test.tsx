import { tests } from '@empoleon-tests/core';
import {
  TypographyStylesProvider,
  TypographyStylesProviderProps,
  TypographyStylesProviderStylesNames,
} from './TypographyStylesProvider';

const defaultProps: TypographyStylesProviderProps = {};

describe('@empoleon/core/TypographyStylesProvider', () => {
  tests.itSupportsSystemProps<TypographyStylesProviderProps, TypographyStylesProviderStylesNames>({
    component: TypographyStylesProvider,
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
    displayName: '@empoleon/core/TypographyStylesProvider',
    stylesApiSelectors: ['root'],
  });
});
