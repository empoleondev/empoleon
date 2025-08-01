import { rem } from '@empoleon/core';
import { render } from '../render';
import { JSX } from 'solid-js';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selector?: string;
}

export function itSupportsMarginsProps<Props>(
  options: Options<Props>,
  name = 'supports m, mx, my, mt, mb, mr and ml props'
) {
  const selector = options.selector || '*:not(style)';

  it(name, () => {
    const propsWithM = { ...options.props, m: 45 } as Props & { m: number };
    const { container: m } = render(() => <options.component {...propsWithM} />);

    const propsWithMTheme = { ...options.props, m: "xl" } as Props & { m: string };
    const { container: theme } = render(() => <options.component {...propsWithMTheme} />);

    const propsWithMx = { ...options.props, mx: 34 } as Props & { mx: number };
    const { container: mx } = render(() => <options.component {...propsWithMx} />);

    const propsWithMy = { ...options.props, my: 22 } as Props & { my: number };
    const { container: my } = render(() => <options.component {...propsWithMy} />);

    const propsWithMt = { ...options.props, mt: 13 } as Props & { mt: number };
    const { container: mt } = render(() => <options.component {...propsWithMt} />);

    const propsWithMb = { ...options.props, mb: 43 } as Props & { mb: number };
    const { container: mb } = render(() => <options.component {...propsWithMb} />);

    const propsWithMr = { ...options.props, mr: 98 } as Props & { mr: number };
    const { container: mr } = render(() => <options.component {...propsWithMr} />);

    const propsWithMl = { ...options.props, ml: 11 } as Props & { ml: number };
    const { container: ml } = render(() => <options.component {...propsWithMl} />);

    const propsWithMe = { ...options.props, me: 37 } as Props & { me: number };
    const { container: me } = render(() => <options.component {...propsWithMe} />);

    const propsWithMs = { ...options.props, ms: 39 } as Props & { ms: number };
    const { container: ms } = render(() => <options.component {...propsWithMs} />);

    expect(m.querySelector(selector)).toHaveStyle({ margin: rem(45) });
    expect(theme.querySelector(selector)).toHaveStyle({ margin: 'var(--empoleon-spacing-xl)' });
    expect(mx.querySelector(selector)).toHaveStyle({ marginInline: rem(34) });
    expect(my.querySelector(selector)).toHaveStyle({ marginBlock: rem(22) });
    expect(mt.querySelector(selector)).toHaveStyle({ marginTop: rem(13) });
    expect(mb.querySelector(selector)).toHaveStyle({ marginBottom: rem(43) });
    expect(mr.querySelector(selector)).toHaveStyle({ marginRight: rem(98) });
    expect(ml.querySelector(selector)).toHaveStyle({ marginLeft: rem(11) });
    expect(me.querySelector(selector)).toHaveStyle({ marginInlineEnd: rem(37) });
    expect(ms.querySelector(selector)).toHaveStyle({ marginInlineStart: rem(39) });
  });
}
