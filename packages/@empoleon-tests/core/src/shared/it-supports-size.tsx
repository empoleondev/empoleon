import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selector?: string;
}

export function itSupportsSize<Props>(options: Options<Props>, name = 'supports size') {
  it(name, () => {
    const propsWithSize = { ...options.props, size: "__test-size" } as Props & { size: string };

    const { container } = render(
      () => <options.component {...propsWithSize} size="__test-size" />
    );
    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-size',
      '__test-size'
    );

    const propsWithRemSize = { ...options.props, size: "5rem" } as Props & { size: string };

    const { container: container2 } = render(
      () => <options.component {...propsWithRemSize} size="5rem" />
    );
    expect(container2.querySelector(options.selector || '*:not(style)')!).not.toHaveAttribute(
      'data-size'
    );
  });
}
