import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
}

export function itSupportsLightDarkHidden<Props>(
  options: Options<Props>,
  name = 'supports lightHidden and darkHidden props'
) {
  it(`${name}: lightHidden`, () => {
    const propsWithLightHidden = { ...options.props, lightHidden: true } as Props & { lightHidden: boolean };
    const { container } = render(() => <options.component {...propsWithLightHidden} />);

    expect(container.querySelector('.empoleon-light-hidden')).not.toBe(null);
  });

  it(`${name}: darkHidden`, () => {
    const propsWithDarkHidden = { ...options.props, darkHidden: true } as Props & { darkHidden: boolean };
    const { container } = render(() => <options.component {...propsWithDarkHidden} />);

    expect(container.querySelector('.empoleon-dark-hidden')).not.toBe(null);
  });
}
