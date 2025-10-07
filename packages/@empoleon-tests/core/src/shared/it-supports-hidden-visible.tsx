import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from './get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props);
}

export function itSupportsHiddenVisible<Props>(
  options: Options<Props>,
  name = 'supports hiddenFrom and visibleFrom props'
) {
  it(`${name}: hiddenFrom`, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithHidden = { ...baseProps, hiddenFrom: 'lg' } as Props & { hiddenFrom: string };

    const { container } = render(() => <options.component {...propsWithHidden} hiddenFrom="lg" />);
    expect(container.querySelector('.empoleon-hidden-from-lg')).not.toBe(null);
  });

  it(`${name}: visibleFrom`, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithHidden = { ...baseProps, hiddenFrom: 'sm' } as Props & { hiddenFrom: string };

    const { container } = render(() => <options.component {...propsWithHidden} visibleFrom="sm" />);
    expect(container.querySelector('.empoleon-visible-from-sm')).not.toBe(null);
  });
}
