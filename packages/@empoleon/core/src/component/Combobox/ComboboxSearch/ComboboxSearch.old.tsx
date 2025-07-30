import { createContextContainer, tests } from '@empoleon-tests/core';
import { Combobox } from '../Combobox';
import { ComboboxSearch, ComboboxSearchProps, ComboboxSearchStylesNames } from './ComboboxSearch';

const TestContainer = createContextContainer(ComboboxSearch, Combobox, { withinPortal: false });

const defaultProps: ComboboxSearchProps = {
  leftSection: '$',
};

describe('@empoleon/core/ComboboxSearch', () => {
  tests.itSupportsSystemProps<ComboboxSearchProps, ComboboxSearchStylesNames>({
    component: TestContainer,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLInputElement,
    displayName: '@empoleon/core/ComboboxSearch',
    stylesApiSelectors: ['input', 'section', 'wrapper'],
    stylesApiName: 'Combobox',
    selector: '.empoleon-Combobox-wrapper',
    compound: true,
    providerStylesApi: false,
  });

  tests.itThrowsContextError({
    component: ComboboxSearch,
    props: defaultProps,
    error: 'Combobox component was not found in tree',
  });

  tests.itSupportsFocusEvents({
    component: TestContainer,
    props: defaultProps,
    selector: '.empoleon-Combobox-input',
  });
});
