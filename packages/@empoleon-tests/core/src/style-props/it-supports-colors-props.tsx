import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itSupportsColorsProps<Props>(
  options: Options<Props>,
  name = 'supports c, bg and opacity props'
) {
  const selector = options.selector || '*:not(style)';

  it(name, () => {
    const { container: c } = renderComponent(() => <options.component {...options.props} c="#FEFEFE" />);
    const { container: bg } = renderComponent(() => <options.component {...options.props} bg="#DCDCDC" />);
    const { container: opacity } = renderComponent(() => <options.component {...options.props} opacity={0.85} />);

    expect(c.querySelector(selector)).toHaveStyle({ color: '#FEFEFE' });
    expect(bg.querySelector(selector)).toHaveStyle({ background: '#DCDCDC' });
    expect(opacity.querySelector(selector)).toHaveStyle({ opacity: '0.85' });
  });
}
