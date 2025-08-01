import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selector?: string;
}

export function itSupportsFontsProps<Props>(
  options: Options<Props>,
  name = 'supports ff, fz, lts, ta, lh, fs, tt and td props'
) {
  const selector = options.selector || '*:not(style)';

  it(name, () => {
    const propsWithFzTheme = { ...options.props, fz: "xs" } as Props & { fz: string };
    const { container: theme } = render(() => <options.component {...propsWithFzTheme} />);

    const propsWithFz = { ...options.props, fz: 32 } as Props & { fz: number };
    const { container: fz } = render(() => <options.component {...propsWithFz} />);

    const propsWithFw = { ...options.props, fw: 700 } as Props & { fw: number };
    const { container: fw } = render(() => <options.component {...propsWithFw} />);

    const propsWithFf = { ...options.props, ff: "sans-serif" } as Props & { ff: string };
    const { container: ff } = render(() => <options.component {...propsWithFf} />);

    const propsWithLts = { ...options.props, lts: 16 } as Props & { lts: number };
    const { container: lts } = render(() => <options.component {...propsWithLts} />);

    const propsWithTa = { ...options.props, ta: "right" } as Props & { ta: string };
    const { container: ta } = render(() => <options.component {...propsWithTa} />);

    const propsWithLh = { ...options.props, lh: 2.25 } as Props & { lh: number };
    const { container: lh } = render(() => <options.component {...propsWithLh} />);

    const propsWithFs = { ...options.props, fs: "italic" } as Props & { fs: string };
    const { container: fs } = render(() => <options.component {...propsWithFs} />);

    const propsWithTt = { ...options.props, tt: "uppercase" } as Props & { tt: string };
    const { container: tt } = render(() => <options.component {...propsWithTt} />);

    const propsWithTd = { ...options.props, td: "underline" } as Props & { td: string };
    const { container: td } = render(() => <options.component {...propsWithTd} />);

    expect(theme.querySelector(selector)).toHaveStyle({ fontSize: 'var(--empoleon-font-size-xs)' });
    expect(fz.querySelector(selector)).toHaveStyle({
      fontSize: 'calc(2rem * var(--empoleon-scale))',
    });
    expect(fw.querySelector(selector)).toHaveStyle({ fontWeight: '700' });
    expect(ff.querySelector(selector)).toHaveStyle({ fontFamily: 'sans-serif' });
    expect(lts.querySelector(selector)).toHaveStyle({
      letterSpacing: 'calc(1rem * var(--empoleon-scale))',
    });
    expect(ta.querySelector(selector)).toHaveStyle({ textAlign: 'right' });
    expect(lh.querySelector(selector)).toHaveStyle({ lineHeight: '2.25' });
    expect(fs.querySelector(selector)).toHaveStyle({ fontStyle: 'italic' });
    expect(tt.querySelector(selector)).toHaveStyle({ textTransform: 'uppercase' });
    expect(td.querySelector(selector)).toHaveStyle({ textDecoration: 'underline' });
  });
}
