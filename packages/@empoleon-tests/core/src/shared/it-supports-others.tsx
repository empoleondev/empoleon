import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itSupportsOthers<Props>(
  options: Options<Props>,
  name = 'supports ...others props'
) {
  it(name, () => {
    const { container } = render(() => <options.component {...options.props} data-test-attribute />);
    expect(container.querySelector('[data-test-attribute]')).toBeInTheDocument();
  });
}
