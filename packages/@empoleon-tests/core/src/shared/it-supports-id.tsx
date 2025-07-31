import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
}

export function itSupportsId<Props>(options: Options<Props>, name = 'supports id') {
  it(name, () => {
    render(() => <options.component {...options.props} id="test-empoleon-id" />);
    expect(document.querySelector('#test-empoleon-id')).not.toBe(null);
  });
}
