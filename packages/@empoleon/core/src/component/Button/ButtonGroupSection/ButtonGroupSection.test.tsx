import { tests } from '@empoleon-tests/core';
import {
  ButtonGroupSection,
  ButtonGroupSectionProps,
  ButtonGroupSectionStylesNames,
} from './ButtonGroupSection';

const defaultProps: ButtonGroupSectionProps = {};

describe('@empoleon/core/ButtonGroupSection', () => {
  tests.itSupportsSystemProps<ButtonGroupSectionProps, ButtonGroupSectionStylesNames>({
    component: ButtonGroupSection,
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
    refType: HTMLDivElement,
    displayName: '@empoleon/core/ButtonGroupSection',
    stylesApiSelectors: ['groupSection'],
  });
});
