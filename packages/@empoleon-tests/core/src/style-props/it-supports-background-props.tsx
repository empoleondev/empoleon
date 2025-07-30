import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itSupportsBackgroundProps<Props>(
  options: Options<Props>,
  name = 'supports bd, bgsz, bgp, bgr and bga props'
) {
  const selector = options.selector || '*:not(style)';

  it(name, () => {
    const { container: bgsz } = renderComponent(() => <options.component {...options.props} bgsz={32} />);
    const { container: bgp } = renderComponent(() => <options.component {...options.props} bgp="center" />);
    const { container: bgr } = renderComponent(() => <options.component {...options.props} bgr="repeat" />);
    const { container: bga } = renderComponent(() => <options.component {...options.props} bga="fixed" />);

    expect(bgsz.querySelector(selector)).toHaveStyle({
      backgroundSize: 'calc(2rem * var(--empoleon-scale))',
    });
    expect(bgp.querySelector(selector)).toHaveStyle({ backgroundPosition: 'center' });
    expect(bgr.querySelector(selector)).toHaveStyle({ backgroundRepeat: 'repeat' });
    expect(bga.querySelector(selector)).toHaveStyle({ backgroundAttachment: 'fixed' });
  });
}
