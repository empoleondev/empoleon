import { JSX } from 'solid-js';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
}

export function itSupportsId<Props>(options: Options<Props>, name = 'supports id') {
  it(name, () => {
    const propsWithId = { ...options.props, id: "test-empoleon-id" } as Props & { id: string };

    render(() => <options.component {...propsWithId} id="test-empoleon-id" />);
    expect(document.querySelector('#test-empoleon-id')).not.toBe(null);
  });
}
