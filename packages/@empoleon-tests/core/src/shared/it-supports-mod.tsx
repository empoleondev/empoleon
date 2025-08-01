import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selector?: string;
}

export function itSupportsMod<Props>(options: Options<Props>, name = 'supports mod') {
  it(`${name}: string`, () => {
    const propsWithMod = { ...options.props, mod: "test" } as Props & { mod: string };
    const { container } = render(() => <options.component {...propsWithMod} mod="test" />);

    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-test'
    );
  });

  it(`${name}: object`, () => {
    const propsWithMod = { ...options.props, mod: { test: true, test2: false } } as Props & { mod: any };
    const { container } = render(
      () => <options.component {...propsWithMod} mod={{ test: true, test2: false }} />
    );

    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-test'
    );

    expect(container.querySelector(options.selector || '*:not(style)')!).not.toHaveAttribute(
      'data-test2'
    );
  });

  it(`${name}: array`, () => {
    const propsWithMod = { ...options.props, mod: ['test', 'test2'] } as Props & { mod: any };
    const { container } = render(() => <options.component {...propsWithMod} mod={['test', 'test2']} />);

    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-test'
    );

    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-test2'
    );
  });

  it(`${name}: array with object`, () => {
    const propsWithMod = { ...options.props, mod: ['test', { test2: true }] } as Props & { mod: any };
    const { container } = render(
      () => <options.component {...propsWithMod} mod={['test', { test2: true }]} />
    );

    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-test'
    );

    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-test2'
    );
  });
}
