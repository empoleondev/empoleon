import { render } from '@testing-library/react';
import { screen, tests } from '@empoleon-tests/core';
import { EmpoleonProvider } from '../../core';
import { OptionalPortal } from './OptionalPortal';

describe('@empoleon/core/OptionalPortal', () => {
  tests.itHasExtend({ component: OptionalPortal });

  it('correctly handles withinPortal prop', () => {
    const target = document.createElement('div');
    const { rerender } = render(
      <EmpoleonProvider>
        <OptionalPortal withinPortal={false} target={target}>
          <span>test-portal</span>
        </OptionalPortal>
      </EmpoleonProvider>
    );
    expect(screen.getByText('test-portal')).toBeInTheDocument();
    expect(target.querySelectorAll('*')).toHaveLength(0);

    rerender(
      <EmpoleonProvider>
        <OptionalPortal withinPortal target={target}>
          <span>test-portal</span>
        </OptionalPortal>
      </EmpoleonProvider>
    );

    expect(screen.queryByText('test-portal')).not.toBeInTheDocument();
    expect(target.querySelectorAll('*')).toHaveLength(1);
  });
});
