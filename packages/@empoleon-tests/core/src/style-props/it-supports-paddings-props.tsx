import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from '../shared/get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props);
  selector?: string;
}

export function itSupportsPaddingsProps<Props>(
  options: Options<Props>,
  name = 'supports p, px, py, pt, pb, pr and pl props'
) {
  const selector = options.selector || '*:not(style)';
  const baseProps = getPropsValue(options.props);

  it(name, () => {
    const propsWithP = { ...baseProps, p: '10%' } as Props & { p: string };
    const { container: p } = render(() => <options.component {...propsWithP} />);

    const propsWithPx = { ...baseProps, px: '20%' } as Props & { px: string };
    const { container: px } = render(() => <options.component {...propsWithPx} />);

    const propsWithPy = { ...baseProps, py: '30%' } as Props & { py: string };
    const { container: py } = render(() => <options.component {...propsWithPy} />);

    const propsWithPt = { ...baseProps, pt: '40%' } as Props & { pt: string };
    const { container: pt } = render(() => <options.component {...propsWithPt} />);

    const propsWithPb = { ...baseProps, pb: '50%' } as Props & { pb: string };
    const { container: pb } = render(() => <options.component {...propsWithPb} />);

    const propsWithPr = { ...baseProps, pr: '60%' } as Props & { pr: string };
    const { container: pr } = render(() => <options.component {...propsWithPr} />);

    const propsWithPl = { ...baseProps, pl: '70%' } as Props & { pl: string };
    const { container: pl } = render(() => <options.component {...propsWithPl} />);

    const propsWithPe = { ...baseProps, pe: '80%' } as Props & { pe: string };
    const { container: pe } = render(() => <options.component {...propsWithPe} />);

    const propsWithPs = { ...baseProps, ps: '90%' } as Props & { ps: string };
    const { container: ps } = render(() => <options.component {...propsWithPs} />);

    expect(p.querySelector(selector)).toHaveStyle({ padding: '10%' });
    expect(px.querySelector(selector)).toHaveStyle({ paddingInline: '20%' });
    expect(py.querySelector(selector)).toHaveStyle({ paddingBlock: '30%' });
    expect(pt.querySelector(selector)).toHaveStyle({ paddingTop: '40%' });
    expect(pb.querySelector(selector)).toHaveStyle({ paddingBottom: '50%' });
    expect(pr.querySelector(selector)).toHaveStyle({ paddingRight: '60%' });
    expect(pl.querySelector(selector)).toHaveStyle({ paddingLeft: '70%' });
    expect(pe.querySelector(selector)).toHaveStyle({ paddingInlineEnd: '80%' });
    expect(ps.querySelector(selector)).toHaveStyle({ paddingInlineStart: '90%' });
  });
}
