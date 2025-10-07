import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from './get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props);
}

export function itSupportsLightDarkHidden<Props>(
  options: Options<Props>,
  name = 'supports lightHidden and darkHidden props'
) {
  it(`${name}: lightHidden`, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithLightHidden = { ...baseProps, lightHidden: true } as Props & {
      lightHidden: boolean;
    };
    const { container } = render(() => <options.component {...propsWithLightHidden} />);

    expect(container.querySelector('.empoleon-light-hidden')).not.toBe(null);
  });

  it(`${name}: darkHidden`, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithDarkHidden = { ...baseProps, darkHidden: true } as Props & {
      darkHidden: boolean;
    };
    const { container } = render(() => <options.component {...propsWithDarkHidden} />);

    expect(container.querySelector('.empoleon-dark-hidden')).not.toBe(null);
  });
}
