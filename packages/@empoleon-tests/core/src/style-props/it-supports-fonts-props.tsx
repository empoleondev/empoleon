import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from '../shared/get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props);
  selector?: string;
}

export function itSupportsFontsProps<Props>(
  options: Options<Props>,
  name = 'supports ff, fz, lts, ta, lh, fs, tt and td props'
) {
  const selector = options.selector || '*:not(style)';
  const baseProps = getPropsValue(options.props);

  it(name, () => {
    const propsWithFzTheme = { ...baseProps, fz: 'xs' } as Props & { fz: string };
    const { container: theme } = render(() => <options.component {...propsWithFzTheme} />);

    const propsWithFz = { ...baseProps, fz: 32 } as Props & { fz: number };
    const { container: fz } = render(() => <options.component {...propsWithFz} />);

    const propsWithFw = { ...baseProps, fw: 700 } as Props & { fw: number };
    const { container: fw } = render(() => <options.component {...propsWithFw} />);

    const propsWithFf = { ...baseProps, ff: 'sans-serif' } as Props & { ff: string };
    const { container: ff } = render(() => <options.component {...propsWithFf} />);

    const propsWithLts = { ...baseProps, lts: 16 } as Props & { lts: number };
    const { container: lts } = render(() => <options.component {...propsWithLts} />);

    const propsWithTa = { ...baseProps, ta: 'right' } as Props & { ta: string };
    const { container: ta } = render(() => <options.component {...propsWithTa} />);

    const propsWithLh = { ...baseProps, lh: 2.25 } as Props & { lh: number };
    const { container: lh } = render(() => <options.component {...propsWithLh} />);

    const propsWithFs = { ...baseProps, fs: 'italic' } as Props & { fs: string };
    const { container: fs } = render(() => <options.component {...propsWithFs} />);

    const propsWithTt = { ...baseProps, tt: 'uppercase' } as Props & { tt: string };
    const { container: tt } = render(() => <options.component {...propsWithTt} />);

    const propsWithTd = { ...baseProps, td: 'underline' } as Props & { td: string };
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
