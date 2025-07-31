import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
}

export function itSupportsLightDarkHidden<Props>(
  options: Options<Props>,
  name = 'supports lightHidden and darkHidden props'
) {
  it(`${name}: lightHidden`, () => {
    const { container } = render(() => <options.component {...options.props} lightHidden />);
    expect(container.querySelector('.empoleon-light-hidden')).not.toBe(null);
  });

  it(`${name}: darkHidden`, () => {
    const { container } = render(() => <options.component {...options.props} darkHidden />);
    expect(container.querySelector('.empoleon-dark-hidden')).not.toBe(null);
  });
}
