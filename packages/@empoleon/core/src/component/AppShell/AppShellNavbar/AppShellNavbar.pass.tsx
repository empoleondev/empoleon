import { createContextContainer, render, tests } from '@empoleon-tests/core';
import { AppShell } from '../AppShell';
import { AppShellNavbar, AppShellNavbarProps, AppShellNavbarStylesNames } from './AppShellNavbar';

const TestContainer = createContextContainer(AppShellNavbar, AppShell, {});

const defaultProps: AppShellNavbarProps = {};

describe('@empoleon/core/AppShellNavbar', () => {
  tests.itSupportsSystemProps<AppShellNavbarProps, AppShellNavbarStylesNames>({
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
    displayName: '@empoleon/core/AppShellNavbar',
    stylesApiSelectors: ['navbar'],
    selector: '.empoleon-AppShell-navbar',
    stylesApiName: 'AppShell',
    compound: true,
    providerStylesApi: false,
  });

  tests.itThrowsContextError({
    component: AppShellNavbar,
    props: defaultProps,
    error: 'AppShell was not found in tree',
  });

  it('sets data-with-border attribute based on withBorder prop', () => {
    const { container, rerender } = render(() => <TestContainer withBorder />);
    expect(container.querySelector('.empoleon-AppShell-navbar')).toHaveAttribute(
      'data-with-border',
      'true'
    );

    rerender(() => <TestContainer withBorder={false} />);
    expect(container.querySelector('.empoleon-AppShell-navbar')).not.toHaveAttribute(
      'data-with-border'
    );
  });
});
