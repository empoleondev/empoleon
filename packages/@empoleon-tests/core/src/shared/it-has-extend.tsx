import { JSX } from 'solid-js';

interface Options {
  component: (props: any) => JSX.Element;
}

export function itHasExtend(options: Options, name = 'has static extend function') {
  it(name, () => {
    expect(typeof (options.component as any).extend).toBe('function');
  });
}
