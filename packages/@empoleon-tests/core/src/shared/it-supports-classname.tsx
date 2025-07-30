import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
}

export function itSupportsClassName<Props>(
  options: Options<Props>,
  name = 'supports className prop'
) {
  it(name, () => {
    const { container } = renderComponent(
      () => <options.component {...options.props} className="test-class-name" />
    );

    expect(container.querySelector('.test-class-name')).toBeInTheDocument();
  });
}
