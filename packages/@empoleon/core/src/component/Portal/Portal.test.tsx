import { render, tests } from '@empoleon-tests/core';
import { Portal } from './Portal';

describe('@empoleon/core/Portal', () => {
  tests.itHasExtend({ component: Portal });
  tests.itSupportsRef({
    component: Portal,
    props: { children: 'test' },
    refType: HTMLDivElement,
  });

  it('renders content inside portal', () => {
    render(() => <Portal>test-portal</Portal>);
    const portal = document.querySelector('[data-portal]')!;
    expect(portal.textContent).toBe('test-portal');
  });

  it('supports rendering multiple portal without target', () => {
    render(() => <Portal reuseTargetNode={false}>test-portal-1</Portal>);
    render(() => <Portal reuseTargetNode={false}>test-portal-2</Portal>);
    render(() => <Portal reuseTargetNode={false}>test-portal-3</Portal>);
    expect(
      document.querySelectorAll('[data-portal]:not([data-empoleon-shared-portal-node])')
    ).toHaveLength(3);
  });

  it('has correct displayName', () => {
    expect((Portal as any).displayName).toStrictEqual('@empoleon/core/Portal');
  });

  // it('syncs its className to the generated Portal node', () => {
  //   render(
  //     () => <Portal class="test-portal" reuseTargetNode={false}>
  //       test-portal
  //     </Portal>
  //   );
  //   const portal = document.querySelector('[data-portal]:not([data-empoleon-shared-portal-node])')!;
  //   expect(portal.classList).toContain('test-portal');
  // });

  // it('does not crash when className is empty or contains extra spaces', () => {
  //   render(
  //     () => <Portal class="" reuseTargetNode={false}>
  //       empty-className
  //     </Portal>
  //   );
  //   render(
  //     () => <Portal class="hello  world" reuseTargetNode={false}>
  //       className-with-spaces
  //     </Portal>
  //   );
  //   expect(
  //     document.querySelectorAll('[data-portal]:not([data-empoleon-shared-portal-node])')
  //   ).toHaveLength(2);
  // });
});
