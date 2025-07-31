import { ComponentProps, JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

const TestComponent = (props: ComponentProps<'mark'> & { ref?: any }) => {
  return <mark ref={props.ref} data-child-prop {...props} />;
};

export function itIsPolymorphic<Props>(options: Options<Props>, name = 'is polymorphic') {
  const getTarget = (container: HTMLElement): HTMLElement =>
    container.querySelector(options.selector || '*:not(style)')!;

  it(`${name}: html element`, () => {
    const { container } = render(
      () => <options.component component="a" href="#test-link" {...options.props} />
    );

    const target = getTarget(container as HTMLElement);
    expect(target.tagName).toBe('A');
    expect(target.getAttribute('href')).toBe('#test-link');
  });

  it(`${name}: React component`, () => {
    const { container } = render(
      () => <options.component component={TestComponent} data-parent-prop {...options.props} />
    );

    const target = getTarget(container as HTMLElement);
    expect(target.tagName).toBe('MARK');
    expect(target.getAttribute('data-child-prop')).toBe('');
    expect(target.getAttribute('data-parent-prop')).toBe('true');
  });

  it(`${name}: renderRoot`, () => {
    const { container } = render(
      () => <options.component
        renderRoot={(props: any) => <a href="#test-link" {...props} />}
        {...options.props}
      />
    );

    const target = getTarget(container as HTMLElement);
    expect(target.tagName).toBe('A');
    expect(target.getAttribute('href')).toBe('#test-link');
  });
}
