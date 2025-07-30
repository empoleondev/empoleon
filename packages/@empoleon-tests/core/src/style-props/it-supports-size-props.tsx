import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itSupportsSizeProps<Props>(
  options: Options<Props>,
  name = 'supports w, miw, maw, h, mih and mah props'
) {
  const selector = options.selector || '*:not(style)';

  it(name, () => {
    const { container: theme } = renderComponent(() => <options.component {...options.props} w="xl" />);
    const { container: w } = renderComponent(() => <options.component {...options.props} w="10%" />);
    const { container: miw } = renderComponent(() => <options.component {...options.props} miw="10vh" />);
    const { container: maw } = renderComponent(() => <options.component {...options.props} maw="20%" />);
    const { container: h } = renderComponent(() => <options.component {...options.props} h="10%" />);
    const { container: mih } = renderComponent(() => <options.component {...options.props} mih="10vh" />);
    const { container: mah } = renderComponent(() => <options.component {...options.props} mah="20%" />);

    expect(theme.querySelector(selector)).toHaveStyle({ width: 'var(--empoleon-spacing-xl)' });
    expect(w.querySelector(selector)).toHaveStyle({ width: '10%' });
    expect(miw.querySelector(selector)).toHaveStyle({ minWidth: '10vh' });
    expect(maw.querySelector(selector)).toHaveStyle({ maxWidth: '20%' });
    expect(h.querySelector(selector)).toHaveStyle({ height: '10%' });
    expect(mih.querySelector(selector)).toHaveStyle({ minHeight: '10vh' });
    expect(mah.querySelector(selector)).toHaveStyle({ maxHeight: '20%' });
  });
}
