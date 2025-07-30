import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itSupportsPositionProps<Props>(
  options: Options<Props>,
  name = 'supports pos, top, left, bottom, right, inset and display props'
) {
  const selector = options.selector || '*:not(style)';

  it(name, () => {
    const { container: pos } = renderComponent(() => <options.component {...options.props} pos="absolute" />);
    const { container: top } = renderComponent(() => <options.component {...options.props} top="1rem" />);
    const { container: left } = renderComponent(() => <options.component {...options.props} left="2rem" />);
    const { container: bottom } = renderComponent(() => <options.component {...options.props} bottom="3rem" />);
    const { container: right } = renderComponent(() => <options.component {...options.props} right="4rem" />);
    const { container: inset } = renderComponent(() => <options.component {...options.props} inset="5rem" />);
    const { container: display } = renderComponent(() => <options.component {...options.props} display="flex" />);
    const { container: flex } = renderComponent(() => <options.component {...options.props} flex="0 0 1" />);

    expect(pos.querySelector(selector)).toHaveStyle({ position: 'absolute' });
    expect(top.querySelector(selector)).toHaveStyle({ top: '1rem' });
    expect(left.querySelector(selector)).toHaveStyle({ left: '2rem' });
    expect(bottom.querySelector(selector)).toHaveStyle({ bottom: '3rem' });
    expect(right.querySelector(selector)).toHaveStyle({ right: '4rem' });
    expect(inset.querySelector(selector)).toHaveStyle({ inset: '5rem' });
    expect(display.querySelector(selector)).toHaveStyle({ display: 'flex' });
    expect(flex.querySelector(selector)).toHaveStyle({ flex: '0 0 1' });
  });
}
