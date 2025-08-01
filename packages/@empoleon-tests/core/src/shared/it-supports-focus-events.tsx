import { fireEvent } from '@solidjs/testing-library';
import { render } from '../render';
import { JSX } from 'solid-js';
import { vi } from 'vitest';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itSupportsFocusEvents<Props>(
  options: Options<Props>,
  name = 'supports focus events'
) {
  it(name, () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const { container } = render(
      () => <options.component {...options.props} onFocus={onFocus} onBlur={onBlur} />
    );

    fireEvent.focus(container.querySelector(options.selector || '*:not(style)')!);
    expect(onFocus).toHaveBeenCalled();

    fireEvent.blur(container.querySelector(options.selector || '*:not(style)')!);
    expect(onBlur).toHaveBeenCalled();
  });
}
