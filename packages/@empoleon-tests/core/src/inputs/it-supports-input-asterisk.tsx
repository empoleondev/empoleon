import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
}

export function itSupportsInputAsterisk<Props>(
  options: Options<Props>,
  name = 'supports combination of withAsterisk and required props'
) {
  it(name, () => {
    const { container } = render(() => (
      <options.component {...options.props} required={false} withAsterisk={false} />
    ));

    expect(container.querySelector('.empoleon-InputWrapper-required')).not.toBeInTheDocument();

    const { container: container2 } = render(() => (
      <options.component {...options.props} required withAsterisk={false} />
    ));
    expect(container2.querySelector('.empoleon-InputWrapper-required')).not.toBeInTheDocument();

    const { container: container3 } = render(() => (
      <options.component {...options.props} required={false} withAsterisk />
    ));
    expect(container3.querySelector('.empoleon-InputWrapper-required')).toBeInTheDocument();

    const { container: container4 } = render(() => (
      <options.component {...options.props} required withAsterisk />
    ));
    expect(container4.querySelector('.empoleon-InputWrapper-required')).toBeInTheDocument();
  });
}
