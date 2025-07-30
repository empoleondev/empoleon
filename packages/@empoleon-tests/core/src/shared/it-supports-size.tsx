import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itSupportsSize<Props>(options: Options<Props>, name = 'supports size') {
  it(name, () => {
    const { container } = renderComponent(
      () => <options.component {...options.props} size="__test-size" />
    );
    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-size',
      '__test-size'
    );

    const { container: container2 } = renderComponent(
      () => <options.component {...options.props} size="5rem" />
    );
    expect(container2.querySelector(options.selector || '*:not(style)')!).not.toHaveAttribute(
      'data-size'
    );
  });
}
