import { createContextContainer, tests } from '@empoleon-tests/core';
import { Menu } from '../Menu';
import { MenuLabel, MenuLabelProps, MenuLabelStylesNames } from './MenuLabel';

const TestContainer = createContextContainer(MenuLabel, Menu, { opened: true });

const defaultProps: MenuLabelProps = {};

describe('@empoleon/core/MenuLabel', () => {
  tests.itSupportsSystemProps<MenuLabelProps, MenuLabelStylesNames>({
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
    displayName: '@empoleon/core/MenuLabel',
    stylesApiSelectors: ['label'],
    stylesApiName: 'Menu',
    compound: true,
    providerStylesApi: false,
  });
});
