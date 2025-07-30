import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itSupportsFontsProps<Props>(
  options: Options<Props>,
  name = 'supports ff, fz, lts, ta, lh, fs, tt and td props'
) {
  const selector = options.selector || '*:not(style)';

  it(name, () => {
    const { container: theme } = renderComponent(() => <options.component {...options.props} fz="xs" />);
    const { container: fz } = renderComponent(() => <options.component {...options.props} fz={32} />);
    const { container: fw } = renderComponent(() => <options.component {...options.props} fw={700} />);
    const { container: ff } = renderComponent(() => <options.component {...options.props} ff="sans-serif" />);
    const { container: lts } = renderComponent(() => <options.component {...options.props} lts={16} />);
    const { container: ta } = renderComponent(() => <options.component {...options.props} ta="right" />);
    const { container: lh } = renderComponent(() => <options.component {...options.props} lh={2.25} />);
    const { container: fs } = renderComponent(() => <options.component {...options.props} fs="italic" />);
    const { container: tt } = renderComponent(() => <options.component {...options.props} tt="uppercase" />);
    const { container: td } = renderComponent(() => <options.component {...options.props} td="underline" />);

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
