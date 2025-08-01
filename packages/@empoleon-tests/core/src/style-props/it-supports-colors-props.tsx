import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selector?: string;
}

export function itSupportsColorsProps<Props>(
  options: Options<Props>,
  name = 'supports c, bg and opacity props'
) {
  const selector = options.selector || '*:not(style)';

  it(name, () => {
    const propsWithC = { ...options.props, c: "#FEFEFE" } as Props & { c: string };
    const { container: c } = render(() => <options.component {...propsWithC} />);

    const propsWithBg = { ...options.props, bg: "#DCDCDC" } as Props & { bg: string };
    const { container: bg } = render(() => <options.component {...propsWithBg} />);

    const propsWithOpacity = { ...options.props, opacity: 0.85 } as Props & { opacity: number };
    const { container: opacity } = render(() => <options.component {...propsWithOpacity} />);

    expect(c.querySelector(selector)).toHaveStyle({ color: '#FEFEFE' });
    expect(bg.querySelector(selector)).toHaveStyle({ background: '#DCDCDC' });
    expect(opacity.querySelector(selector)).toHaveStyle({ opacity: '0.85' });
  });
}
