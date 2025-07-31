import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itSupportsSize<Props>(options: Options<Props>, name = 'supports size') {
  it(name, () => {
    const { container } = render(
      () => <options.component {...options.props} size="__test-size" />
    );
    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-size',
      '__test-size'
    );

    const { container: container2 } = render(
      () => <options.component {...options.props} size="5rem" />
    );
    expect(container2.querySelector(options.selector || '*:not(style)')!).not.toHaveAttribute(
      'data-size'
    );
  });
}
