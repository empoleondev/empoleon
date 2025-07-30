import { JSX } from 'solid-js/jsx-runtime';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itConnectsLabelAndInput<Props>(
  options: Options<Props>,
  name = 'connects label and input'
) {
  it(name, () => {
    const { container } = renderComponent(
      () => <options.component {...options.props} id="secret-test-id" label="Test label" />
    );
    expect(container.querySelector('[for="secret-test-id"]')).toBeInTheDocument();
    expect(container.querySelector('#secret-test-id')).toBeInTheDocument();
  });
}
