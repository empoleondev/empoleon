import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from './get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
}

export function itSupportsId<Props>(options: Options<Props>, name = 'supports id') {
  it(name, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithId = { ...baseProps, id: "test-empoleon-id" } as Props & { id: string };

    render(() => <options.component {...propsWithId} id="test-empoleon-id" />);
    expect(document.querySelector('#test-empoleon-id')).not.toBe(null);
  });
}
