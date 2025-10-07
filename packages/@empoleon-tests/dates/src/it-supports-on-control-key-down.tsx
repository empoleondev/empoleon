import userEvent from '@testing-library/user-event';
import { JSX } from 'solid-js';
import { vi } from 'vitest';
import { render } from '@empoleon-tests/core';

interface Options {
  component: (props: any) => JSX.Element;
  props: Record<string, any>;
}

export function itSupportsOnControlKeydown(options: Options, name = 'supports __onControlKeyDown') {
  it(name, async () => {
    const spy = vi.fn();
    const { container } = render(() => (
      <options.component
        {...options.props}
        __onControlKeyDown={(_event: any, payload: any) => {
          spy(payload);
        }}
      />
    ));

    await userEvent.type(container.querySelector('table button')!, '{space}');
    expect(spy).toHaveBeenCalledWith({ rowIndex: 0, cellIndex: 0, date: expect.any(String) });
  });
}
