import { createContextContainer, tests } from '@empoleon-tests/core';
import { AppShell } from '../AppShell';
import { AppShellMain, AppShellMainProps, AppShellMainStylesNames } from './AppShellMain';

const TestContainer = createContextContainer(AppShellMain, AppShell, {});

const defaultProps: AppShellMainProps = {};

describe('@empoleon/core/AppShellMain', () => {
  tests.itSupportsSystemProps<AppShellMainProps, AppShellMainStylesNames>({
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
    refType: HTMLElement,
    displayName: '@empoleon/core/AppShellMain',
    stylesApiSelectors: ['main'],
    selector: '.empoleon-AppShell-main',
    stylesApiName: 'AppShell',
    compound: true,
    providerStylesApi: false,
  });

  tests.itThrowsContextError({
    component: AppShellMain,
    props: defaultProps,
    error: 'AppShell was not found in tree',
  });
});
