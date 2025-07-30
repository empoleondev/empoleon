import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itSupportsVariant<Props>(options: Options<Props>, name = 'supports variant') {
  it(name, () => {
    const { container } = renderComponent(() => <options.component {...options.props} variant="__test-variant" />);
    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-variant',
      '__test-variant'
    );
  });
}
