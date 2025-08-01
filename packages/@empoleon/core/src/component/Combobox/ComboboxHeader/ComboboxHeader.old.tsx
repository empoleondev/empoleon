import { createContextContainer, tests } from '@empoleon-tests/core';
import { Combobox } from '../Combobox';
import { ComboboxHeader, ComboboxHeaderProps, ComboboxHeaderStylesNames } from './ComboboxHeader';

const TestContainer = createContextContainer(ComboboxHeader, Combobox, { withinPortal: false });

const defaultProps: ComboboxHeaderProps = {};

describe('@empoleon/core/ComboboxHeader', () => {
  tests.itSupportsSystemProps<ComboboxHeaderProps, ComboboxHeaderStylesNames>({
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
    displayName: '@empoleon/core/ComboboxHeader',
    stylesApiSelectors: ['header'],
    stylesApiName: 'Combobox',
    selector: '.empoleon-Combobox-header',
    compound: true,
    providerStylesApi: false,
  });

  tests.itThrowsContextError({
    component: ComboboxHeader,
    props: defaultProps,
    error: 'Combobox component was not found in tree',
  });
});
