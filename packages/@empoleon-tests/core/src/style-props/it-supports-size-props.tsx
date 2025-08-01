import { JSX } from 'solid-js';
import { render } from '../render';

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

  it(name, () => {
    const propsWithWTheme = { ...options.props, w: "xl" } as Props & { w: string };
    const { container: theme } = render(() => <options.component {...propsWithWTheme} />);

    const propsWithW = { ...options.props, w: "10%" } as Props & { w: string };
    const { container: w } = render(() => <options.component {...propsWithW} />);

    const propsWithMiw = { ...options.props, miw: "10vh" } as Props & { miw: string };
    const { container: miw } = render(() => <options.component {...propsWithMiw} />);

    const propsWithMaw = { ...options.props, maw: "20%" } as Props & { maw: string };
    const { container: maw } = render(() => <options.component {...propsWithMaw} />);

    const propsWithH = { ...options.props, h: "10%" } as Props & { h: string };
    const { container: h } = render(() => <options.component {...propsWithH} />);

    const propsWithMih = { ...options.props, mih: "10vh" } as Props & { mih: string };
    const { container: mih } = render(() => <options.component {...propsWithMih} />);

    const propsWithMah = { ...options.props, mah: "20%" } as Props & { mah: string };
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
