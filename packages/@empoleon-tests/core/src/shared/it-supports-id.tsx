import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
}

export function itSupportsId<Props>(options: Options<Props>, name = 'supports id') {
  it(name, () => {
    renderComponent(() => <options.component {...options.props} id="test-empoleon-id" />);
    expect(document.querySelector('#test-empoleon-id')).not.toBe(null);
  });
}
