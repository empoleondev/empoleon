import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from '../shared/get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props);
  selector?: string;
}

export function itSupportsBackgroundProps<Props>(
  options: Options<Props>,
  name = 'supports bd, bgsz, bgp, bgr and bga props'
) {
  const selector = options.selector || '*:not(style)';
  const baseProps = getPropsValue(options.props);

  it(name, () => {
    const propsWithBgsz = { ...baseProps, bgsz: 32 } as Props & { bgsz: number };
    const { container: bgsz } = render(() => <options.component {...propsWithBgsz} />);

    const propsWithBgp = { ...baseProps, bgp: "center" } as Props & { bgp: string };
    const { container: bgp } = render(() => <options.component {...propsWithBgp} />);

    const propsWithBgr = { ...baseProps, bgr: "repeat" } as Props & { bgr: string };
    const { container: bgr } = render(() => <options.component {...propsWithBgr} />);

    const propsWithBga = { ...baseProps, bga: "fixed" } as Props & { bga: string };
    const { container: bga } = render(() => <options.component {...propsWithBga} />);


    expect(bgsz.querySelector(selector)).toHaveStyle({
      backgroundSize: 'calc(2rem * var(--empoleon-scale))',
    });
    expect(bgp.querySelector(selector)).toHaveStyle({ backgroundPosition: 'center' });
    expect(bgr.querySelector(selector)).toHaveStyle({ backgroundRepeat: 'repeat' });
    expect(bga.querySelector(selector)).toHaveStyle({ backgroundAttachment: 'fixed' });
  });
}
