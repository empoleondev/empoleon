import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from '../shared/get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selector?: string;
}

export function itSupportsSizeProps<Props>(
  options: Options<Props>,
  name = 'supports w, miw, maw, h, mih and mah props'
) {
  const selector = options.selector || '*:not(style)';
  const baseProps = getPropsValue(options.props);

  it(name, () => {
    const propsWithWTheme = { ...baseProps, w: "xl" } as Props & { w: string };
    const { container: theme } = render(() => <options.component {...propsWithWTheme} />);

    const propsWithW = { ...baseProps, w: "10%" } as Props & { w: string };
    const { container: w } = render(() => <options.component {...propsWithW} />);

    const propsWithMiw = { ...baseProps, miw: "10vh" } as Props & { miw: string };
    const { container: miw } = render(() => <options.component {...propsWithMiw} />);

    const propsWithMaw = { ...baseProps, maw: "20%" } as Props & { maw: string };
    const { container: maw } = render(() => <options.component {...propsWithMaw} />);

    const propsWithH = { ...baseProps, h: "10%" } as Props & { h: string };
    const { container: h } = render(() => <options.component {...propsWithH} />);

    const propsWithMih = { ...baseProps, mih: "10vh" } as Props & { mih: string };
    const { container: mih } = render(() => <options.component {...propsWithMih} />);

    const propsWithMah = { ...baseProps, mah: "20%" } as Props & { mah: string };
    const { container: mah } = render(() => <options.component {...propsWithMah} />);

    expect(theme.querySelector(selector)).toHaveStyle({ width: 'var(--empoleon-spacing-xl)' });
    expect(w.querySelector(selector)).toHaveStyle({ width: '10%' });
    expect(miw.querySelector(selector)).toHaveStyle({ minWidth: '10vh' });
    expect(maw.querySelector(selector)).toHaveStyle({ maxWidth: '20%' });
    expect(h.querySelector(selector)).toHaveStyle({ height: '10%' });
    expect(mih.querySelector(selector)).toHaveStyle({ minHeight: '10vh' });
    expect(mah.querySelector(selector)).toHaveStyle({ maxHeight: '20%' });
  });
}
