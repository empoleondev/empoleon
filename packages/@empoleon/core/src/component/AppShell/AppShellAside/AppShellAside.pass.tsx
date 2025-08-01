import { createContextContainer, render, tests } from '@empoleon-tests/core';
import { AppShell } from '../AppShell';
import { AppShellAside, AppShellAsideProps, AppShellAsideStylesNames } from './AppShellAside';

const TestContainer = createContextContainer(AppShellAside, AppShell, {});

const defaultProps: AppShellAsideProps = {};

describe('@empoleon/core/AppShellAside', () => {
  tests.itSupportsSystemProps<AppShellAsideProps, AppShellAsideStylesNames>({
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
    displayName: '@empoleon/core/AppShellAside',
    stylesApiSelectors: ['aside'],
    selector: '.empoleon-AppShell-aside',
    stylesApiName: 'AppShell',
    compound: true,
    providerStylesApi: false,
  });

  tests.itThrowsContextError({
    component: AppShellAside,
    props: defaultProps,
    error: 'AppShell was not found in tree',
  });

  it('sets data-with-border attribute based on withBorder prop', () => {
    const { container, rerender } = render(() => <TestContainer withBorder />);
    expect(container.querySelector('.empoleon-AppShell-aside')).toHaveAttribute(
      'data-with-border',
      'true'
    );

    rerender(() => <TestContainer withBorder={false} />);
    expect(container.querySelector('.empoleon-AppShell-aside')).not.toHaveAttribute(
      'data-with-border'
    );
  });
});
