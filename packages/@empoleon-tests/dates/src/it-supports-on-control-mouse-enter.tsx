import userEvent from '@testing-library/user-event';
import { render } from '@empoleon-tests/core';
import { vi } from 'vitest';
import { JSX } from 'solid-js';

interface Options {
  component: (props: any) => JSX.Element;
  props: Record<string, any>;
}

export function itSupportsOnControlMouseEnter(
  options: Options,
  name = 'supports __onControlMouseEnter'
) {
  it(name, async () => {
    const spy = vi.fn();
    const { container } = render(
      () => <options.component
        {...options.props}
        __onControlMouseEnter={(_event: any, date: any) => {
          spy(date);
        }}
      />
    );

    await userEvent.hover(container.querySelector('table button')!);
    expect(spy).toHaveBeenCalledWith(expect.any(String));
  });
}
