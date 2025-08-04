import { ComponentProps, JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from './get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selector?: string;
}

const TestComponent = (props: ComponentProps<'mark'> & { ref?: any }) => {
  return <mark ref={props.ref} data-child-prop {...props} />;
};

export function itIsPolymorphic<Props>(options: Options<Props>, name = 'is polymorphic') {
  const getTarget = (container: HTMLElement): HTMLElement =>
    container.querySelector(options.selector || '*:not(style)')!;

  it(`${name}: html element`, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithComponentAndHref = { ...baseProps, component: "a", href: "#test-link" } as Props & { component: string; href: string };
    const { container } = render(
      () => <options.component {...propsWithComponentAndHref} />
    );

    const target = getTarget(container as HTMLElement);
    expect(target.tagName).toBe('A');
    expect(target.getAttribute('href')).toBe('#test-link');
  });

  it(`${name}: React component`, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithComponentAndDataAttribute = { ...baseProps, component: TestComponent, "data-parent-prop": true } as Props & { component: typeof TestComponent; "data-parent-prop": boolean };
    const { container } = render(
      () => <options.component {...propsWithComponentAndDataAttribute} />
    );

    const target = getTarget(container as HTMLElement);
    expect(target.tagName).toBe('MARK');
    expect(target.getAttribute('data-child-prop')).toBe('');
    expect(target.getAttribute('data-parent-prop')).toBe('true');
  });

  it(`${name}: renderRoot`, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithRenderRoot = { ...baseProps, renderRoot: (props: any) => <a href="#test-link" {...props} /> } as Props & { renderRoot: (props: any) => JSX.Element };
    const { container } = render(
      () => <options.component {...propsWithRenderRoot} />
    );

    const target = getTarget(container as HTMLElement);
    expect(target.tagName).toBe('A');
    expect(target.getAttribute('href')).toBe('#test-link');
  });
}
