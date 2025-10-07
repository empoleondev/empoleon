import userEvent from '@testing-library/user-event';
import { JSX } from 'solid-js';
import { vi } from 'vitest';
import { render } from '@empoleon-tests/core';

interface Options {
  component: (props: any) => JSX.Element;
  props: Record<string, any>;
}

export function itSupportsOnControlClick(options: Options, name = 'supports __onControlClick') {
  it(name, async () => {
    const spy = vi.fn();
    const { container } = render(() => (
      <options.component
        {...options.props}
        __onControlClick={(_event: any, date: any) => {
          spy(date);
        }}
      />
    ));

    await userEvent.click(container.querySelector('table button')!);
    expect(spy).toHaveBeenCalledWith(expect.any(String));
  });
}
