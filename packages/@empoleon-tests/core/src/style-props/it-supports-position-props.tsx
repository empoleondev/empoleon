import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from '../shared/get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selector?: string;
}

export function itSupportsPositionProps<Props>(
  options: Options<Props>,
  name = 'supports pos, top, left, bottom, right, inset and display props'
) {
  const selector = options.selector || '*:not(style)';
  const baseProps = getPropsValue(options.props);

  it(name, () => {
    const propsWithPos = { ...baseProps, pos: "absolute" } as Props & { pos: string };
    const { container: pos } = render(() => <options.component {...propsWithPos} />);

    const propsWithTop = { ...baseProps, top: "1rem" } as Props & { top: string };
    const { container: top } = render(() => <options.component {...propsWithTop} />);

    const propsWithLeft = { ...baseProps, left: "2rem" } as Props & { left: string };
    const { container: left } = render(() => <options.component {...propsWithLeft} />);

    const propsWithBottom = { ...baseProps, bottom: "3rem" } as Props & { bottom: string };
    const { container: bottom } = render(() => <options.component {...propsWithBottom} />);

    const propsWithRight = { ...baseProps, right: "4rem" } as Props & { right: string };
    const { container: right } = render(() => <options.component {...propsWithRight} />);

    const propsWithInset = { ...baseProps, inset: "5rem" } as Props & { inset: string };
    const { container: inset } = render(() => <options.component {...propsWithInset} />);

    const propsWithDisplay = { ...baseProps, display: "flex" } as Props & { display: string };
    const { container: display } = render(() => <options.component {...propsWithDisplay} />);

    const propsWithFlex = { ...baseProps, flex: "0 0 1" } as Props & { flex: string };
    const { container: flex } = render(() => <options.component {...propsWithFlex} />);

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
