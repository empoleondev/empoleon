import { JSX } from 'solid-js/jsx-runtime';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
}

export function itSupportsInputContainer<Props>(
  options: Options<Props>,
  name = 'supports inputContainer props'
) {
  it(name, () => {
    const { container } = render(
      () => <options.component
        {...options.props}
        inputContainer={(children: JSX.Element) => (
          <div class="test-input-container">{children}</div>
        )}
      />
    );
    expect(container.querySelector('.test-input-container')).toBeInTheDocument();
    expect(
      container.querySelector('.test-input-container .empoleon-Input-input')
    ).toBeInTheDocument();
  });
}
