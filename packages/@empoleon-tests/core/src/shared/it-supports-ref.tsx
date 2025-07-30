import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
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

    renderComponent(() => <options.component {...options.props} {...{ [options.refProp || 'ref']: refCallback }} />);
    expect(ref).toBeInstanceOf(options.refType);
  });
}
