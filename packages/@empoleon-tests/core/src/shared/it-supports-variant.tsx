import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selector?: string;
}

export function itSupportsVariant<Props>(options: Options<Props>, name = 'supports variant') {
  it(name, () => {
    const propsWithVariant = { ...options.props, variant: "__test-variant" } as Props & { variant: string };

    const { container } = render(() => <options.component {...propsWithVariant} variant="__test-variant" />);
    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-variant',
      '__test-variant'
    );
  });
}
