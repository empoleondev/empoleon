import { createContextContainer, tests } from '@empoleon-tests/core';
import { Combobox } from '../Combobox';
import { ComboboxGroup, ComboboxGroupProps, ComboboxGroupStylesNames } from './ComboboxGroup';

const TestContainer = createContextContainer(ComboboxGroup, Combobox, { withinPortal: false });

const defaultProps: ComboboxGroupProps = {
  label: 'test-label',
};

describe('@empoleon/core/ComboboxGroup', () => {
  tests.itSupportsSystemProps<ComboboxGroupProps, ComboboxGroupStylesNames>({
    component: TestContainer,
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
    displayName: '@empoleon/core/ComboboxGroup',
    stylesApiSelectors: ['group', 'groupLabel'],
    stylesApiName: 'Combobox',
    selector: '.empoleon-Combobox-group',
    compound: true,
    providerStylesApi: false,
  });

  tests.itThrowsContextError({
    component: ComboboxGroup,
    props: defaultProps,
    error: 'Combobox component was not found in tree',
  });
});
