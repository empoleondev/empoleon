import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  refType: any;
  refProp?: string;
  selector?: string;
}

export function itSupportsRef<Props>(options: Options<Props>, name = 'supports ref') {
  it(name, () => {
    let ref: typeof options.refType;
    const refCallback = (el: typeof options.refType) => {
      ref = el;
    };

    const propsWithRef = { ...options.props, [options.refProp || 'ref']: refCallback } as Props & { [K in string]: (el: typeof options.refType) => void };
    render(() => <options.component {...propsWithRef} {...{ [options.refProp || 'ref']: refCallback }} />);
    expect(ref).toBeInstanceOf(options.refType);
  });
}
