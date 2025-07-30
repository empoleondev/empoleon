import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itSupportsMod<Props>(options: Options<Props>, name = 'supports mod') {
  it(`${name}: string`, () => {
    const { container } = renderComponent(() => <options.component {...options.props} mod="test" />);
    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-test'
    );
  });

  it(`${name}: object`, () => {
    const { container } = renderComponent(
      () => <options.component {...options.props} mod={{ test: true, test2: false }} />
    );

    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-test'
    );

    expect(container.querySelector(options.selector || '*:not(style)')!).not.toHaveAttribute(
      'data-test2'
    );
  });

  it(`${name}: array`, () => {
    const { container } = renderComponent(() => <options.component {...options.props} mod={['test', 'test2']} />);

    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-test'
    );

    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-test2'
    );
  });

  it(`${name}: array with object`, () => {
    const { container } = renderComponent(
      () => <options.component {...options.props} mod={['test', { test2: true }]} />
    );

    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-test'
    );

    expect(container.querySelector(options.selector || '*:not(style)')!).toHaveAttribute(
      'data-test2'
    );
  });
}
