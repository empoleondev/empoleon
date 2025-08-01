import { JSX } from "solid-js";

interface Options {
  component: (props: any) => JSX.Element;
}

export function itHasWithProps(options: Options, name = 'has static withProps function') {
  it(name, () => {
    expect(typeof (options.component as any).withProps).toBe('function');
  });
}
