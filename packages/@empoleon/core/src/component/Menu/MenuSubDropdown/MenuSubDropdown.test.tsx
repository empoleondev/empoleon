import { createContextContainer, tests } from '@empoleon-tests/core';
import { Menu } from '../Menu';
import {
  MenuSubDropdown,
  MenuSubDropdownProps,
  MenuSubDropdownStylesNames,
} from './MenuSubDropdown';

const TestContainer = createContextContainer(MenuSubDropdown, Menu, {
  opened: true,
  withinPortal: false,
});

const defaultProps: MenuSubDropdownProps = {};

describe('@empoleon/core/MenuSubDropdown', () => {
  tests.itSupportsSystemProps<MenuSubDropdownProps, MenuSubDropdownStylesNames>({
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
    displayName: '@empoleon/core/MenuSubDropdown',
    stylesApiSelectors: ['dropdown'],
    stylesApiName: 'Menu',
    compound: true,
    providerStylesApi: false,
  });
});
