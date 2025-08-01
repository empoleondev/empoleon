import { tests } from '@empoleon-tests/core';
import {
  ActionIconGroupSection,
  ActionIconGroupSectionProps,
  ActionIconGroupSectionStylesNames,
} from './ActionIconGroupSection';

const defaultProps: ActionIconGroupSectionProps = {};

describe('@empoleon/core/ActionIconGroupSection', () => {
  tests.itSupportsSystemProps<ActionIconGroupSectionProps, ActionIconGroupSectionStylesNames>({
    component: ActionIconGroupSection,
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
    displayName: '@empoleon/core/ActionIconGroupSection',
    stylesApiSelectors: ['groupSection'],
  });
});
