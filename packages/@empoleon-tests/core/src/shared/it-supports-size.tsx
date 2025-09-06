import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from './get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selector?: string;
}

export function itSupportsSize<Props>(options: Options<Props>, name = 'supports size') {
  it(name, () => {
    const baseProps = getPropsValue(options.props);

    // First test: size="__test-size" should have data-size
    const propsWithSize = { ...baseProps, size: "__test-size" } as Props & { size: string };
    const { container } = render(
      () => <options.component {...propsWithSize} />
    );
    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-size',
      '__test-size'
    );

    // Second test: size="5rem" should NOT have data-size
    const propsWithRemSize = { ...baseProps, size: "5rem" } as Props & { size: string };
    const { container: container2 } = render(
      () => <options.component {...propsWithRemSize} />
    );
    expect(container2.querySelector(options.selector || '*:not(style)')!).not.toHaveAttribute(
      'data-size'
    );
  });
}
