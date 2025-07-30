import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
}

export function itSupportsHiddenVisible<Props>(
  options: Options<Props>,
  name = 'supports hiddenFrom and visibleFrom props'
) {
  it(`${name}: hiddenFrom`, () => {
    const { container } = renderComponent(() => <options.component {...options.props} hiddenFrom="lg" />);
    expect(container.querySelector('.empoleon-hidden-from-lg')).not.toBe(null);
  });

  it(`${name}: visibleFrom`, () => {
    const { container } = renderComponent(() => <options.component {...options.props} visibleFrom="sm" />);
    expect(container.querySelector('.empoleon-visible-from-sm')).not.toBe(null);
  });
}
