import userEvent from '@testing-library/user-event';
import { render } from '@empoleon-tests/core';
import { vi } from 'vitest';
import { JSX } from 'solid-js';

interface Options {
  component: (props: any) => JSX.Element;
  props: Record<string, any>;
}

export function itSupportsOnDayKeydown(options: Options, name = 'supports __onDayKeyDown') {
  it(name, async () => {
    const spy = vi.fn();
    const { container } = render(
      () => <options.component
        {...options.props}
        month="2022-04-11"
        __onDayKeyDown={(_event: any, payload: any) => {
          spy(payload);
        }}
      />
    );

    await userEvent.type(container.querySelector('table button')!, '{space}');
    expect(spy).toHaveBeenCalledWith({ rowIndex: 0, cellIndex: 0, date: '2022-03-28' });
  });
}
